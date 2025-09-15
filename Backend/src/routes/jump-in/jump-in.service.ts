import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { parseCookies } from '../../utils/parse-cookies';
import { USER_INOUT_ID_COOKIE_NAME } from '../../constants/user-inout-id';

@Injectable()
export class JumpInService {
  private EXPIRE_DAY_INOUT_ID: number = 7;

  async jumpUserIn(res: Response, req: Request) {
    const { inoutUserId } = parseCookies(req);
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
  }
}
