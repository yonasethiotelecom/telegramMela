import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TelegrafService } from './telegraf.service';

@Controller('telegraf')
export class TelegrafController {
  constructor(private readonly telegrafService: TelegrafService) {}
  // Endpoint to broadcast a message sent from a specific user
  @Post('broadcast')
  async broadcastMessageFromUser(
    @Body() body: { chatId: string; message: string },
  ): Promise<string> {
    const { chatId, message } = body;

    if (!chatId || !message) {
      throw new BadRequestException('chatId and message are required');
    }


    await this.telegrafService.broadcastMessageToAllUsers(message, chatId);
    return `Message "${message}" broadcasted from user ${chatId} to all other users.`;
  }
}
