import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsNumber, Min, Max } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({
    description: 'Numéro de compte bancaire',
    example: 'MG76123456789',
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

  @ApiProperty({
    description: 'Montant à retirer (en MGA)',
    example: 100.50,
    minimum: 1,
    maximum: 1000000
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(1000000)
  amount: number;
}