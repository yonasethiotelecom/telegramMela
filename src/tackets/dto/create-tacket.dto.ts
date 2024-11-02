import { IsInt, IsString } from 'class-validator';

export class CreateTacketDto {
  @IsInt()
  number: number;

  @IsString()
  chatId: string;

  @IsString()
  profileId: string;
}
