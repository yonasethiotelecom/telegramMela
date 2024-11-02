import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class LotteryService {
  private readonly logger = new Logger(LotteryService.name);

  constructor(private prisma: PrismaService) {}

  // Function to get profiles whose game has ended and tickets are eligible for drawing
  async getEligibleProfiles() {
    const currentDate = new Date();
    return this.prisma.profile.findMany({
      where: {
        endDate: { lte: currentDate },
        winners: {
          none: { level: 3 }, // No winner of level 3 yet
        },
      },
      include: {
        ticket: {
          where: { winner: null }, // Tickets with no winners
        },
      },
    });
  }

  // Function to randomly pick N tickets from a pool
  private getRandomTickets(tickets, count: number) {
    const shuffled = tickets.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Main function to draw and save winners in the database
  async drawWinners() {
    this.logger.warn(`$$$$$$$$$$$$$$$yonas`);
    const eligibleProfiles = await this.getEligibleProfiles();

    for (const profile of eligibleProfiles) {
      if (profile.ticket.length < 3) {
        this.logger.warn(
          `Profile ${profile.id} doesn't have enough tickets for a full draw.`,
        );
        continue;
      }

      const existingWinners = await this.prisma.winner.findMany({
        where: { profileId: profile.id },
      });

      if (existingWinners.length >= 3) {
        this.logger.warn(`Profile ${profile.id} already has 3 winners.`);
        continue;
      }

      const remainingLevels = [1, 2, 3].filter(
        (level) => !existingWinners.some((winner) => winner.level === level),
      );

      const randomTickets = this.getRandomTickets(
        profile.ticket,
        remainingLevels.length,
      );

      for (let i = 0; i < randomTickets.length; i++) {
        await this.prisma.winner.create({
          data: {
            ticketId: randomTickets[i].id,
            profileId: profile.id,
            level: remainingLevels[i],
          },
        });
        this.logger.log(
          `Ticket ${randomTickets[i].id} won level ${remainingLevels[i]} for profile ${profile.id}`,
        );
      }
    }
  }
}
