import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTacketDto } from './dto/create-tacket.dto';
import { UpdateTacketDto } from './dto/update-tacket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TacketsService {
  constructor(private prisma: PrismaService) {}

  async createTicket(createTicketDto: CreateTacketDto) {
    const { number, chatId, profileId } = createTicketDto;

    // Find the TelegramUser by chatId and include the balance
    const telegramUser = await this.prisma.telegramUser.findUnique({
      where: { chatId },
      include: { balance: true },
    });

    if (!telegramUser) {
      throw new NotFoundException('Telegram user not found');
    }

    // Find the Profile by profileId
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // Ensure the user has sufficient balance
    const { balance: userBalance } = telegramUser.balance;
    const { gamePrice } = profile;

    if (userBalance < gamePrice) {
      throw new NotFoundException('Insufficient balance');
    }

    // Calculate the new balance
    const newBalance = userBalance - gamePrice;

    // Check if the relationship already exists in the join table (TelegramUserProfile)
    const existingRelation = await this.prisma.telegramUserProfile.findFirst({
      where: {
        telegramUserId: telegramUser.id,
        profileId: profile.id,
      },
    });

    // Start a transaction for updating balance, creating the ticket, and adding relation if needed
    const result = await this.prisma.$transaction([
      // Update balance
      this.prisma.balance.update({
        where: { id: telegramUser.balance.id },
        data: { balance: newBalance },
      }),
      // Create a new ticket connected to TelegramUser and Profile
      this.prisma.ticket.create({
        data: {
          number,
          telegramUser: { connect: { id: telegramUser.id } },
          profile: { connect: { id: profile.id } },
        },
      }),
      // If the relationship doesn't exist, create it in the join table
      ...(existingRelation
        ? []
        : [
            this.prisma.telegramUserProfile.create({
              data: {
                telegramUserId: telegramUser.id,
                profileId: profile.id,
              },
            }),
          ]),
    ]);

    return result; // Returns the updated balance and created ticket
  }

  findAll() {
    return `This action returns all tackets`;
  }

  findBy(profileId: string) {
    // const now = new Date(); // Current date and time
    //expreed retun ssss

    const removed = this.prisma.profile.findUnique({
      where: {
        id: profileId,
        /* startDate: {
          lt: now, // Start date is less than (before) today
        },
        endDate: {
          gt: now, // End date is greater than (after) today
        }, */
      },
      include: {
        ticket: {
          select: {
            number: true,
          },
        },
      },
    });
    return removed;
  }

  update(id: number, updateTacketDto: UpdateTacketDto) {
    return `This action updates a #${id} tacket`;
  }

  remove(id: number) {
    return `This action removes a #${id} tacket`;
  }
}
