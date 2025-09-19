import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { USER_INOUT_ID_COOKIE_NAME } from '../../constants/user-inout-id';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args) {
    const handshake = client.handshake;
    const cookieHeader = handshake.headers.cookie;

    if (!cookieHeader) {
      client._error('failed to authenticate');
      return;
    }

    // Parse unsigned cookies
    const parsedCookies = cookie.parse(cookieHeader);
    const inoutUserId: string | undefined =
      parsedCookies[USER_INOUT_ID_COOKIE_NAME];

    if (!inoutUserId) {
      client._error('failed to authenticate');
      return;
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
