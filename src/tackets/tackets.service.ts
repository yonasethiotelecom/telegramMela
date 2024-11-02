import { Injectable } from '@nestjs/common';
import { CreateTacketDto } from './dto/create-tacket.dto';
import { UpdateTacketDto } from './dto/update-tacket.dto';

@Injectable()
export class TacketsService {
  create(createTacketDto: CreateTacketDto) {
    return 'This action adds a new tacket';
  }

  findAll() {
    return `This action returns all tackets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tacket`;
  }

  update(id: number, updateTacketDto: UpdateTacketDto) {
    return `This action updates a #${id} tacket`;
  }

  remove(id: number) {
    return `This action removes a #${id} tacket`;
  }
}
