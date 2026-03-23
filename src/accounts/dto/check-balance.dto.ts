import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CheckBalanceDto {
  @ApiProperty({
    description: 'Numéro de compte bancaire',
    example: 'FR76123456789',
    minLength: 5,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  accountNumber: string;

  @ApiProperty({
    description: 'Code bancaire',
    example: '30001',
    minLength: 3,
    maxLength: 10
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  bankCode: string;
}