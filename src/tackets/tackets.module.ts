import { Module } from '@nestjs/common';
import { TacketsService } from './tackets.service';
import { TacketsController } from './tackets.controller';

@Module({
  controllers: [TacketsController],
  providers: [TacketsService],
})
export class TacketsModule {}
