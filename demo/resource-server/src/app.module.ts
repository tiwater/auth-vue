import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpStrategy } from './auth/http.strategy';

@Module({
  controllers: [AppController],
  providers: [AppService, HttpStrategy],
})
export class AppModule {}
