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
  async jumpUserIn(@Res() res: Response, @Req() req: Request) {
    return this.jumpInService.jumpUserIn(res, req);
  }
}
