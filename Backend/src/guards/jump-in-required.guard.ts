import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { parseCookies } from '../utils/parse-cookies';
import { UserService } from '../routes/user/user.service';
import { Nullable } from 'xenopomp-essentials';
import { User } from '@prisma/client';

export const getUserFromCtx = (ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest<
    Request & {
      user: User;
    }
  >();
  return req.user;
};

@Injectable()
export class JumpInRequiredGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<
      Request & {
        user?: User;
      }
    >();
    const { inoutUserId } = parseCookies(request);

    // Cookie is not presented. Can not activate.
    if (!inoutUserId) {
      // @ts-expect-error User is mapped by ourselves
      request.user = undefined;
      return false;
    }

    const oldUser: Nullable<User> = await this.userService.getById(inoutUserId);
    // User with that id does not exist. Can not activate either.
    if (!oldUser) {
      // @ts-expect-error User is mapped by ourselves
      request.user = undefined;
      return false;
    }

    // User exists here. That means, that we can officially activate now.
    // @ts-expect-error User is mapped by ourselves
    request.user = oldUser;
    return true;
  }
}

export const JumpInRequired = () =>
  applyDecorators(UseGuards(JumpInRequiredGuard));

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const user = getUserFromCtx(ctx);
    return data ? user[data] : user;
  },
);
