import { Controller, Get } from '@nestjs/common';
import { LotteryService } from './lottery.service';

@Controller('lottery')
export class LotteryController {
  constructor(private lotteryService: LotteryService) {}

  @Get('draw')
  async drawWinners() {
    await this.lotteryService.drawWinners();
    return { message: 'Lottery draw complete' };
  }
}
