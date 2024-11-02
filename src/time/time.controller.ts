import { Controller, Get } from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get('current')
  getCurrentTime() {
    return this.timeService.getCurrentTime();
  }
}
