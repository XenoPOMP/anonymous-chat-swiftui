import { Controller } from '@nestjs/common';
import { JumpInService } from './jump-in.service';

@Controller('jump-in')
export class JumpInController {
  constructor(private readonly jumpInService: JumpInService) {}

  async jumpUserIn() {}
}
