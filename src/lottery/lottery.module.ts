import { Module } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { LotteryController } from './lottery.controller';
import { LotteryScheduler } from './lottery.scheduler';

@Module({
  controllers: [LotteryController],
  providers: [LotteryService, LotteryScheduler],
})
export class LotteryModule {}
