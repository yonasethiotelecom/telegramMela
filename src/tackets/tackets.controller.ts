import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TacketsService } from './tackets.service';
import { CreateTacketDto } from './dto/create-tacket.dto';
import { UpdateTacketDto } from './dto/update-tacket.dto';

@Controller('tackets')
export class TacketsController {
  constructor(private readonly tacketsService: TacketsService) {}

  @Post()
  create(@Body() createTacketDto: CreateTacketDto) {
    return this.tacketsService.create(createTacketDto);
  }

  @Get()
  findAll() {
    return this.tacketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tacketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTacketDto: UpdateTacketDto) {
    return this.tacketsService.update(+id, updateTacketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tacketsService.remove(+id);
  }
}
