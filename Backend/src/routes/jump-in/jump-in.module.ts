import { Module } from '@nestjs/common';
import { JumpInService } from './jump-in.service';
import { JumpInController } from './jump-in.controller';

@Module({
  controllers: [JumpInController],
  providers: [JumpInService],
})
export class JumpInModule {}
