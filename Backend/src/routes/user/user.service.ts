import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../features/prisma/prisma.service';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  Config as NamesGeneratorConfig,
} from 'unique-names-generator';
import { User } from '@prisma/client';
import { Nullable } from 'xenopomp-essentials';
import seedColor from 'seed-color';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Extracts color for user`s generated name.
   * @param user {User}  fetched user
   */
  getSeededColor({ generatedName }: User): string {
    return seedColor(generatedName).toHex();
  }

  getRandomName(): string {
    const config: NamesGeneratorConfig = {
      dictionaries: [adjectives, colors, animals],
      separator: ' ',
      style: 'capital',
    };

    return uniqueNamesGenerator(config);
  }

  async getById(userId: string): Promise<Nullable<User>> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async create(): Promise<User> {
    return this.prisma.user.create({
      data: {
        generatedName: this.getRandomName(),
      },
    });
  }
}
