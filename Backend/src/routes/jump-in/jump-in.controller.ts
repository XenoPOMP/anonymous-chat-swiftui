import { Controller } from '@nestjs/common';
import { JumpInService } from './jump-in.service';
import { Endpoint } from '../../decorators/endpoint';

@Controller('jump-in')
export class JumpInController {
  constructor(private readonly jumpInService: JumpInService) {}

  @Endpoint('POST', '/')
  async jumpUserIn() {
    return 'Jumped in!';
  }
}
