import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LotteryService } from './lottery.service';

@Injectable()
export class LotteryScheduler {
  constructor(private lotteryService: LotteryService) {}

  // Run the lottery draw every 10 minutes
  @Cron('45 * * * * *')
  async handleCron() {
    console.log('Lottery scheduler running');
    await this.lotteryService.drawWinners();
  }
}
