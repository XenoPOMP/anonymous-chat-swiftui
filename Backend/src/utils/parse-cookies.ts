import { Request } from 'express';
import { USER_INOUT_ID_COOKIE_NAME } from '../constants/user-inout-id';

interface ParsedCookiesResult {
  inoutUserId: string | undefined;
}

const parseSingleCookie = (
  cookies: Request['cookies'],
  name: string,
): string | undefined => {
  if (name in cookies) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return cookies[name];
  }

  return undefined;
};

export const parseCookies = (req: Request): ParsedCookiesResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const allCookies = req.cookies;
  const inoutUserId = parseSingleCookie(allCookies, USER_INOUT_ID_COOKIE_NAME);

  return {
    inoutUserId,
  };
};
