import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { parseCookies } from '../utils/parse-cookies';
import { UserService } from '../routes/user/user.service';
import { Nullable } from 'xenopomp-essentials';
import { User } from '@prisma/client';

@Injectable()
export class JumpInRequiredGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const { inoutUserId } = parseCookies(request);

    // Cookie is not presented. Can not activate.
    if (!inoutUserId) {
      return false;
    }

    const oldUser: Nullable<User> = await this.userService.getById(inoutUserId);
    // User with that id does not exist. Can not activate either.
    if (!oldUser) {
      return false;
    }

    // User exists here. That means, that we can officially activate now.
    return true;
  }
}

export const JumpInRequired = () =>
  applyDecorators(UseGuards(JumpInRequiredGuard));
