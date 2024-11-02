import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;

  @IsOptional() // Marking startParam as optional
  @IsString()
  startParam?: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;
}
