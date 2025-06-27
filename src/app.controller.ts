import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('calculate/:a/:b')
  calculate(@Param('a', ParseIntPipe) a: number, @Param('b', ParseIntPipe) b: number) {
    return this.appService.calculate(a, b);
  }
}
