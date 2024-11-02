import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(data: CreateProfileDto) {
    return await this.prisma.profile.create({
      data,
    });
  }

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    const result = this.prisma.profile.findMany();
    return result;
  }

  async findBoth(chatId: string, profileId: string) {
    // Find the TelegramUser by chatId to get the user's ID
    const telegramUser = await this.prisma.telegramUser.findUnique({
      where: {
        chatId: chatId,
      },
      select: {
        id: true, // Only select the ID field
      },
    });

    if (!telegramUser) {
      throw new Error('Telegram user not found');
    }

    // Now fetch the tickets based on both the profileId and the TelegramUserId
    const result = await this.prisma.ticket.findMany({
      where: {
        profileId: profileId,
        TelegramUserId: telegramUser.id, // Use the fetched ID
      },
    });

    return result;
  }
  async findId(chatId: string) {
    const now = new Date(); // Current date and time

    const result = await this.prisma.telegramUser.findUnique({
      where: {
        chatId: chatId, // Find the TelegramUser using chatId
      },
      include: {
        profiles: {
          orderBy: {
            profile: {
              startDate: 'desc',
            },
          },
          where: {
            profile: {
              startDate: {
                lt: now, // Start date is less than (before) today
              },
              endDate: {
                gt: now, // End date is greater than (after) today
              },
            },
          },
          include: {
            /* profile: {
              include: {
                ticket: true, // Include the tickets related to the profile
              },
            }, */
            profile: true,
          },
        },
      },
    });

    return result;
  }

  findActiveGames() {
    const now = new Date(); // Current date and time

    const result = this.prisma.profile.findMany({
      where: {
        startDate: {
          lt: now, // Start date is less than (before) today
        },
        endDate: {
          gt: now, // End date is greater than (after) today
        },
      },
      orderBy: {
        startDate: 'desc', // Optional: Order by the start date (most recent games first)
      },
    });

    return result;
  }

  findEndedGames() {
    const now = new Date(); // Current date and time

    const result = this.prisma.profile.findMany({
      where: {
        endDate: {
          lt: now, // Game has ended (end date is in the past)
        },
      },
      orderBy: {
        endDate: 'desc', // Optional: Order by the end date (most recent ended games first)
      },
    });

    return result;
  }


  // Function to get winner tickets by profileId
  async findWinnersByProfileId(profileId: string) {
    return this.prisma.winner.findMany({
      where: {
        profileId: profileId, // Filter by the given profileId
      },
      include: {
        ticket: {
          include: {
            telegramUser: {
              select: {
                id: true,
                chatId: true,
                username: true,
                // You can add other fields from TelegramUser you want to return
              },
            },
            profile: {
              select: {
                id: true,
                gameType: true,
                gameNumber: true,
                gamePrice: true,
                endDate: true,
              },
            },
          },
        },
      },
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
