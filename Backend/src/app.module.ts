import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JumpInModule } from './routes/jump-in/jump-in.module';
import { UserModule } from './routes/user/user.module';
import { PrismaModule } from './features/prisma/prisma.module';

@Module({
  imports: [JumpInModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
