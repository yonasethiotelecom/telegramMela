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

  async findId(chatId: string) {
    const telegramUser = await this.prisma.telegramUser.findUniqueOrThrow({
      where: { chatId },
      select: {
        chatId: true,
        profile: {
          include: {
            ticket: true,
          },
        },
      },
    });
    return telegramUser;
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
