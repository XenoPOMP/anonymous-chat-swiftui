import { Controller, HttpStatus, Req, Res } from '@nestjs/common';
import { JumpInService } from './jump-in.service';
import { Endpoint } from '../../decorators/endpoint';
import { Request, Response } from 'express';

@Controller('jump-in')
export class JumpInController {
  constructor(private readonly jumpInService: JumpInService) {}

  @Endpoint('POST', '/', {
    code: HttpStatus.OK,
  })
  async jumpUserIn(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.jumpInService.jumpUserIn(res, req);
    return res;
  }
}
