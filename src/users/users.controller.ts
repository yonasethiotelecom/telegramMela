import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChapaService } from 'chapa-nestjs';
import { CreateAmountDto } from './dto/amount-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private chapaService: ChapaService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('rechi');
    return this.usersService.createUser(createUserDto);
  }

  @Post('amount')
  addAmount(@Body() createAmountDto: CreateAmountDto) {
    console.log(createAmountDto);
    return this.usersService.createAmount(createAmountDto);
  }

  @Post('withdraw')
  withdrawAmount(@Body() createAmountDto: CreateAmountDto) {
    console.log(createAmountDto);
    return this.usersService.withdrawAmount(createAmountDto);
  }

  @Get()
  async findAll() {
    // Generate transaction reference using our utility method or provide your own
    const tx_ref = await this.chapaService.generateTransactionReference();

    const response = await this.chapaService.mobileInitialize({
      first_name: 'yonas',
      last_name: 'asfaw',
      email: '',
      currency: 'ETB',
      amount: '200',
      tx_ref: tx_ref,
      callback_url: 'https://example.com/',
      return_url: 'https://example.com/',
      customization: {
        title: 'Test Title',
        description: 'Test Description',
      },
    });
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      console.log('yonas' + id);
      const chatId = id; // Convert string to BigInt
      const user = await this.usersService.findTelegramUserByChatId(chatId);
      return user ? user : { message: 'User not found' };
    } catch {
      return { message: 'Invalid chatId format' }; // Handle invalid BigInt conversion
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
