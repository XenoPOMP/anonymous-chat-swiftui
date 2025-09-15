import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JumpInModule } from './routes/jump-in/jump-in.module';

@Module({
  imports: [JumpInModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
