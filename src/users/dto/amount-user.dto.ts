import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class CreateAmountDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  amount: number;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;
  @IsNotEmpty()
  @IsString()
  bankName: string;

}

