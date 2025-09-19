import { Controller } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '@prisma/client';
import { Endpoint } from '../../decorators/endpoint';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Endpoint('GET', '/', {
    code: 200,
  })
  async getHistory(): Promise<Message[]> {
    return this.messagesService.getAll();
  }
}
