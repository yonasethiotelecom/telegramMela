import { IsString, IsInt, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  gameType: string;

  @IsInt()
  imageNum: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsInt()
  gameNumber: number;

  @IsNumber()
  gamePrice: number;

  @IsOptional()
  @IsString()
  gameDescription?: string;
}
