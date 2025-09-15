import { Controller, Req } from '@nestjs/common';
import { JumpInService } from './jump-in.service';
import { Endpoint } from '../../decorators/endpoint';
import { Request } from 'express';
import { parseCookies } from '../../utils/parse-cookies';

@Controller('jump-in')
export class JumpInController {
  constructor(private readonly jumpInService: JumpInService) {}

  @Endpoint('POST', '/')
  async jumpUserIn(@Req() req: Request) {
    const { inoutUserId } = parseCookies(req);

    return 'Jumped in!';
  }
}
