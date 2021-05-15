import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'Get messages',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Authorization failed, need to check the username/password and vendorId.',
  })
  @UseGuards(AuthGuard('bearer'))
  @Get('messages')
  getMessages(): string {
    return this.appService.getMessages();
  }
}
