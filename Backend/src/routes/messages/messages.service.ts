import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../features/prisma/prisma.service';
import { Message, Prisma, User } from '@prisma/client';
import { UserService } from '../user/user.service';

export type MessageResponse = Pick<
  Message,
  'id' | 'createdAt' | 'textContent'
> &
  Pick<User, 'generatedName'> & {
    seededColor: string;
  };

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  private rawToHandled(
    message: Message & {
      user: User;
    },
  ): MessageResponse {
    const { id, createdAt, textContent } = message;
    const { generatedName } = message.user;
    const seededColor = this.userService.getSeededColor(message.user);

    return {
      id,
      createdAt,
      generatedName,
      seededColor,
      textContent,
    };
  }

  async getAll(): Promise<MessageResponse[]> {
    const messages = await this.prisma.message.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return messages.map((raw) => this.rawToHandled(raw));
  }

  async createOne<Data extends Prisma.MessageCreateArgs['data']>(data: Data) {
    return this.prisma.message.create({
      data,
      include: {
        user: true,
      },
    });
  }
}
