import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../features/prisma/prisma.service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

  async createOne(data: Prisma.MessageCreateArgs['data']): Promise<Message> {
    return this.prisma.message.create({
      data,
    });
  }
}
