import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JumpInModule } from './routes/jump-in/jump-in.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [JumpInModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
