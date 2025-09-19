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
import { JumpInRequired } from '../../guards/jump-in-required.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
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

  handleConnection(client: Socket, ...args) {
    this.parseCookies(client);
  }

  @SubscribeMessage('sub')
  handleSubscribe(client: Socket) {
    // const id = client.id;
  }
}
