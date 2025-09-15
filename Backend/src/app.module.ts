import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JumpInModule } from './routes/jump-in/jump-in.module';
import { UserModule } from './routes/user/user.module';
import { PrismaService } from './features/prisma.service';

@Module({
  imports: [JumpInModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
