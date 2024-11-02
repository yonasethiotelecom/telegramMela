import { PartialType } from '@nestjs/mapped-types';
import { CreateTacketDto } from './create-tacket.dto';

export class UpdateTacketDto extends PartialType(CreateTacketDto) {}
