import { Module } from '@nestjs/common';
import { TelegrafService } from './telegraf.service';
import { TelegrafController } from './telegraf.controller';

@Module({
  controllers: [TelegrafController],
  providers: [TelegrafService],
})
export class TelegrafModule {}
