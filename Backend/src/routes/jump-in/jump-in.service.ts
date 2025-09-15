import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { parseCookies } from '../../utils/parse-cookies';
import { USER_INOUT_ID_COOKIE_NAME } from '../../constants/user-inout-id';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { Nullable } from 'xenopomp-essentials';

@Injectable()
export class JumpInService {
  constructor(private readonly userService: UserService) {}

  private EXPIRE_DAY_INOUT_ID: number = 7;

  async jumpUserIn(res: Response, req: Request) {
    const { inoutUserId } = parseCookies(req);

    // userId is not passed through server cookies.
    // That means that user needs to be re-created.
    if (inoutUserId === undefined) {
      await this.createAndAssign(res);
      return;
    }

    // Get user from DB.
    const oldUser: Nullable<User> = await this.userService.getById(inoutUserId);

    // User does not exist. Creating new one.
    if (!oldUser) {
      await this.createAndAssign(res);
      return;
    }

    // User is defined here. Adding id to cookies.
    this.addInoutIdToResponse(res, inoutUserId);
  }

  async createAndAssign(res: Response) {
    const { id }: User = await this.userService.create();
    this.addInoutIdToResponse(res, id);
  }

  addInoutIdToResponse(res: Response, userId: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_INOUT_ID);

    res.cookie(USER_INOUT_ID_COOKIE_NAME, userId, {
      expires: expiresIn,
      httpOnly: true,
      secure: false,
      sameSite: false,
      priority: 'high',
    });

    res.send('User assigned!');
  }
}
