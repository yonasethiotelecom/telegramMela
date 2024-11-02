import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAmountDto } from './dto/amount-user.dto';
import { ChapaService } from 'chapa-nestjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private chapaService: ChapaService,
  ) {}

  async withdrawAmount({
    chatId,
    amount,
    accountNumber,
    bankName,
  }: CreateAmountDto) {
    try {
      // Retrieve user info and balance using chatId
      const info = await this.prisma.telegramUser.findUnique({
        where: { chatId },
        select: {
          id: true,
          balance: {
            select: {
              id: true,
              balance: true,
            },
          },
        },
      });

      // Check if the user exists and has a balance
      if (!info || !info.balance) {
        return { message: 'User or balance not found' };
      }

      // Check if the user has sufficient balance
      if (info.balance.balance < amount) {
        return { message: 'Insufficient funds' };
      }

      // Prepare the operations for updating the balance and creating a waiting balance
      const depositUpdate = this.prisma.balance.update({
        where: { id: info.balance.id },
        data: { balance: info.balance.balance - amount }, // Deduct the amount
      });

      const creatingWaiting = this.prisma.watingBalance.create({
        data: {
          balance: amount,
          accountNumber,
          bankName,
          telegramUser: {
            connect: { id: info.id }, // Connect the balance to the TelegramUser
          },
        },
      });

      // Execute the operations in a transaction
      const result = await this.prisma.$transaction([
        depositUpdate,
        creatingWaiting,
      ]);

      return { message: 'Transaction successful', result };
    } catch (error) {
      console.error('Error withdrawing amount:', error);
      return { message: 'Transaction failed', error: error.message };
    }
  }

  async createAmount({ chatId, amount }: CreateAmountDto) {
    const tx_ref = await this.chapaService.generateTransactionReference();
    const info = await this.prisma.telegramUser.findUnique({
      where: { chatId },
      select: {
        user: true,
      },
    });
    if (info.user) {
      console.log(info.user);
      const response = await this.chapaService.mobileInitialize({
        first_name: info.user.first_name,
        last_name: info.user.last_name,
        email: 'cliant@mele.com',
        currency: 'ETB',
        amount: String(amount),
        tx_ref: tx_ref,
        callback_url: 'https://example.com/',
        return_url: 'https://example.com/',
        customization: {
          title: 'Test Title',
          description: 'Test Description',
        },
      });
      console.log(response);
      if (response.status == 'success') {
        // Find the TelegramUser by chatId
        const telegramUser = await this.prisma.telegramUser.findUnique({
          where: { chatId },
        });

        if (!telegramUser) {
          throw new Error('TelegramUser not found');
        }

        // Upsert the balance: create a new one if it doesn't exist, or update if it does
        await this.prisma.balance.upsert({
          where: {
            // We assume that a balance is unique to a user (telegramUserId)
            telegramUserId: telegramUser.id,
          },
          create: {
            balance: amount, // Set the initial balance
            telegramUser: {
              connect: { id: telegramUser.id }, // Connect the balance to the TelegramUser
            },
          },
          update: {
            balance: {
              increment: amount, // Add the new amount to the existing balance
            },
          },
        });
      }

      return response;
    } else if (info) {
      const response = await this.chapaService.mobileInitialize({
        first_name: 'clinet',
        last_name: 'client',
        email: 'cliant@mele.com',
        currency: 'ETB',
        amount: String(amount),
        tx_ref: tx_ref,
        callback_url: 'https://example.com/',
        return_url: 'https://example.com/',
        customization: {
          title: 'Test Title',
          description: 'Test Description',
        },
      });

      if (response.status == 'success') {
        // Find the TelegramUser by chatId
        const telegramUser = await this.prisma.telegramUser.findUnique({
          where: { chatId },
        });

        if (!telegramUser) {
          throw new Error('TelegramUser not found');
        }

        // Upsert the balance: create a new one if it doesn't exist, or update if it does
        await this.prisma.balance.upsert({
          where: {
            // We assume that a balance is unique to a user (telegramUserId)
            telegramUserId: telegramUser.id,
          },
          create: {
            balance: amount, // Set the initial balance
            telegramUser: {
              connect: { id: telegramUser.id }, // Connect the balance to the TelegramUser
            },
          },
          update: {
            balance: {
              increment: amount, // Add the new amount to the existing balance
            }, // Update the existing balance
          },
        });
      }
      return response;
    } else {
      return null;
    }
  }
  async createUser({ chatId, ...updatedObject }: CreateUserDto) {
    const telegramUser = await this.prisma.telegramUser.findUnique({
      where: { chatId },
    });

    if (!telegramUser) {
      throw new NotFoundException(
        `Telegram user with chatId ${chatId} not found`,
      );
    }

    // Prepare the data object for User creation
    const userCreateData: any = {
      ...updatedObject,
      telegramUser: {
        connect: { id: telegramUser.id },
      },
    };

    const user = await this.prisma.user.create({
      data: userCreateData,
    });

    // Prepare the response, converting startParam to string
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findTelegramUserByChatId(chatId: string) {
    const telegramUser = await this.prisma.telegramUser.findUniqueOrThrow({
      where: { chatId },
      select: {
        user: true,
        balance: true,
        watingBalance: true,
      },
    });
    return telegramUser;
  }

  async findWaingByChatId(chatId: string) {
    const telegramUser = await this.prisma.telegramUser.findUniqueOrThrow({
      where: { chatId },
      select: {
        user: true,
        balance: true,
        watingBalance: true,
      },
    });
    return telegramUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
