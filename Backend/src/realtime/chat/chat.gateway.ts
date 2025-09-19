import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import * as cookieParser from 'cookie-parser';
import { USER_INOUT_ID_COOKIE_NAME } from '../../constants/user-inout-id';
import { UnauthorizedException } from '@nestjs/common';

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

    if (cookieHeader) {
      // Parse unsigned cookies
      const parsedCookies = cookie.parse(cookieHeader);
      console.log(parsedCookies[USER_INOUT_ID_COOKIE_NAME]);
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
