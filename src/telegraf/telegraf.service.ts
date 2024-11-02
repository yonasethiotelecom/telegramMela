import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Telegraf } from 'telegraf';

const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Launch via Inline Keyboard',
          url: `https://t.me/MelaOnTelegram_bot/MeleTelegram`, // Deep link to your bot
        },
      ],
    ],
  },
};

@Injectable()
export class TelegrafService {
  private readonly bot: Telegraf;

  constructor(private readonly prisma: PrismaService) {
    this.bot = new Telegraf('7637449473:AAE0-jO9gV-LfDs72lcGPcX3AgRz5wjiaBI');
    this.initializeBot();
  }

  private initializeBot(): void {
    // Handle the /start command
    this.bot.start(async (ctx) => {
      const chatId = ctx.message.chat.id;
      const username =
        ctx.message.chat.type === 'private'
          ? ctx.message.chat.first_name || null
          : null;

      await this.saveUser(chatId.toString(), username);
      ctx.reply('Welcome to the bot!');
    });

    // Handle incoming text messages
    this.bot.on('text', async (ctx) => {
      const chatId = ctx.message.chat.id;

      console.log(this.getIpAddress(ctx));
      const username =
        ctx.message.chat.type === 'private'
          ? ctx.message.chat.first_name || null
          : null;
      const receivedMessage = ctx.message.text;

      await this.saveUser(chatId.toString(), username);
    

      if (chatId == 7277258087) {
        await this.broadcastMessageToAllUsers(
          receivedMessage,
          chatId.toString(),
        );
      } else {
        ctx.reply(`ychawtu yshelemu`, inlineKeyboard);
      }
    });

    this.bot.launch().then(() => console.log('Telegram bot started'));
  }

  // Save user to the database (if not already saved)
  private async saveUser(
    chatId: string,
    username: string | null,
  ): Promise<void> {
    try {
      await this.prisma.telegramUser.upsert({
        where: { chatId },
        update: { chatId, username },
        create: {
          chatId,
          username,
          balance: {
            create: {
              balance: 0, // Initial balance set to 0
            },
          },
        },
      });
      console.log(`User with chatId ${chatId} saved to the database.`);
    } catch (error) {
      console.error(`Failed to save user: `, error);
    }
  }

  // Broadcast a message to all users except the sender
  public async broadcastMessageToAllUsers(
    message: string,
    senderChatId: string,
  ): Promise<void> {
    try {
      const users = await this.prisma.telegramUser.findMany();

      for (const user of users) {
        if (/*user.chatId !== senderChatId */ true) {
          await this.bot.telegram.sendMessage(
            user.chatId.toString(),
            `Broadcasted message: ${message}`,
            inlineKeyboard,
          );
          console.log(`Message sent to chat ${user.chatId}`);
        }
      }
    } catch (error) {
      console.error(`Failed to send message to users: `, error);
    }
  }

  // Expose the bot instance if needed
  public getBot(): Telegraf {
    return this.bot;
  }

  private getIpAddress(ctx): string | null {
    // The IP address can be obtained from headers or the context, depending on your server architecture
    // Note: ctx.request might not be available directly in Telegraf; use middleware to extract it
    return (
      ctx.request?.headers['x-forwarded-for'] ||
      ctx.request?.connection.remoteAddress ||
      null
    );
  }
}
