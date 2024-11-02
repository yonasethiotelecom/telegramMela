import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TelegrafModule } from './telegraf/telegraf.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChapaModule } from 'chapa-nestjs';
import { ProfilesModule } from './profiles/profiles.module';
import { TacketsModule } from './tackets/tackets.module';
import { TimeModule } from './time/time.module';
import { LotteryModule } from './lottery/lottery.module';
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TelegrafModule,
    PrismaModule,
    UsersModule,
    ChapaModule.register({
      secretKey: 'CHASECK_TEST-9Ce4Ay3HLw6SR0fE1frKAaIDIQO0RURd',
    }),
    ProfilesModule,
    TacketsModule,
    TimeModule,
    LotteryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
