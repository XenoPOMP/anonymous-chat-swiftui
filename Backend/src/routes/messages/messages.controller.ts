import { Controller } from '@nestjs/common';
import { MessageResponse, MessagesService } from './messages.service';
import { Endpoint } from '../../decorators/endpoint';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Endpoint('GET', '/', {
    code: 200,
  })
  async getHistory(): Promise<MessageResponse[]> {
    return this.messagesService.getAll();
  }
}
