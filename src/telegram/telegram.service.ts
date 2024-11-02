import { Injectable, Logger } from '@nestjs/common';

// import * as TelegramBot from 'node-telegram-bot-api'; // works after installing types
// eslint-disable-next-line @typescript-eslint/no-require-imports
const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '7637449473:AAE0-jO9gV-LfDs72lcGPcX3AgRz5wjiaBI';

const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Launch via Inline Keyboard',
          url: 'https://t.me/MelaOnTelegram_bot/MeleTelegram', // Deep link to your bot
        },
      ],
    ],
  },
};

@Injectable()
export class TelegramService {
  private readonly bot: any;
  // private readonly bot:TelegramBot // works after installing types
  private logger = new Logger(TelegramService.name);

  constructor() {
    this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

    this.bot.onText(/\/echo (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message

      const chatId = msg.chat.id;
      const resp = match[1]; // the captured "whatever"

      // send back the matched "whatever" to the chat
      this.bot.sendMessage(chatId, resp);
    });

    //this.bot.on('message', this.onReceiveMessage);
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;

      // send a message to the chat acknowledging receipt of their message
      this.bot.sendMessage(chatId, 'Received your message', inlineKeyboard);
    });

    // this.sendMessageToUser(TEST_USER_ID, `Server started at ${new Date()}`);
  }

 

}
