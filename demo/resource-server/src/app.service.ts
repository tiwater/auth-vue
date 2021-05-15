import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getMessages(): string {
    return JSON.stringify({
      messages: [
        {
          date: new Date(),
          text: 'I am a robot.',
        },
        {
          date: new Date(new Date().getTime() - 1000 * 60 * 60),
          text: 'Hello, world!',
        },
      ],
    });
  }
}
