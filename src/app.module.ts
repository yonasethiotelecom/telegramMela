import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TelegrafModule } from './telegraf/telegraf.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChapaModule } from 'chapa-nestjs';
import { ProfilesModule } from './profiles/profiles.module';
import { TacketsModule } from './tackets/tackets.module';

@Module({
  imports: [
    TelegrafModule,
    PrismaModule,
    UsersModule,
    ChapaModule.register({
      secretKey: 'CHASECK_TEST-9Ce4Ay3HLw6SR0fE1frKAaIDIQO0RURd',
    }),
    ProfilesModule,
    TacketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}