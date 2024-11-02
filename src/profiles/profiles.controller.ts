import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    console.log(createProfileDto);
    return this.profilesService.createProfile(createProfileDto);
  }

  @Get('activeGames')
  ActiveGames() {
    return this.profilesService.findActiveGames();
  }

  @Get('endedGames')
  EndedGames() {
    return this.profilesService.findEndedGames();
  }
  @Get('winners/:profileId')
  Winners(@Param('profileId') profileId: string) {
    return this.profilesService.findWinnersByProfileId(profileId);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get('both/:chatId/:profileId')
  findBoth(
    @Param('chatId') chatId: string,
    @Param('profileId') profileId: string,
  ) {
    console.log(chatId, profileId);
    return this.profilesService.findBoth(chatId, profileId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
