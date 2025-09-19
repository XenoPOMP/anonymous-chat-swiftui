import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { USER_INOUT_ID_COOKIE_NAME } from '../../constants/user-inout-id';
import { Nullable } from 'xenopomp-essentials';
import { ParsedCookiesResult } from '../../utils/parse-cookies';
import { UserService } from '../../routes/user/user.service';
import { Message, User } from '@prisma/client';
import {
  MessageResponse,
  MessagesService,
} from '../../routes/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly userService: UserService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer() server: Server;

  private parseCookies(client: Socket): Nullable<ParsedCookiesResult> {
    const handshake = client.handshake;
    const cookieHeader = handshake.headers.cookie;

    if (!cookieHeader) {
      client._error('failed to authenticate');
      return null;
    }

    // Parse unsigned cookies
    const parsedCookies = cookie.parse(cookieHeader);
    const inoutUserId: string | undefined =
      parsedCookies[USER_INOUT_ID_COOKIE_NAME];

    if (!inoutUserId) {
      client._error('failed to authenticate');
      return null;
    }

    return {
      inoutUserId,
    };
  }

  /**
   * Returns fetched user, if credentials are
   * correct. It also handles errors for client response.
   * @param client
   * @private
   */
  private async passUser(client: Socket): Promise<Nullable<User>> {
    const cookies = this.parseCookies(client);

    // Cookies are undefined
    if (!cookies || !cookies.inoutUserId) {
      client._error('failed to authenticate');
      return null;
    }

    const oldUser: Nullable<User> = await this.userService.getById(
      cookies.inoutUserId,
    );

    // User does not exist
    if (!oldUser) {
      client._error('wrong credentials');
      return null;
    }

    return oldUser;
  }

  async handleConnection(client: Socket) {
    await this.passUser(client);
  }

  @SubscribeMessage('message')
  async receiveMessageFromClient(client: Socket, payload) {
    const user: Nullable<User> = await this.passUser(client);

    if (!user) {
      return;
    }

    if (typeof payload !== 'string') {
      return;
    }

    const newMessage: Message & { user: User } =
      await this.messagesService.createOne({
        userId: user.id,
        textContent: payload,
      });

    const { generatedName } = newMessage.user;
    const { createdAt, textContent, id } = newMessage;
    const seededColor = this.userService.getSeededColor(newMessage.user);

    const response: MessageResponse = {
      id,
      createdAt,
      generatedName,
      seededColor,
      textContent,
    };

    this.server.emit('message', JSON.stringify(response));
  }
}
