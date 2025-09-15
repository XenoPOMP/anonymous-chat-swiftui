import { Module } from '@nestjs/common';
import { JumpInService } from './jump-in.service';
import { JumpInController } from './jump-in.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [JumpInController],
  providers: [JumpInService, UserService],
})
export class JumpInModule {}
