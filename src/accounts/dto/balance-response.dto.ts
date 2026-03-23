import { ApiProperty } from '@nestjs/swagger';

export class BalanceResponseDto {
  @ApiProperty({
    description: 'Solde actuel du compte',
    example: 1500.50,
    type: Number
  })
  balance: number;

  @ApiProperty({
    description: 'Message de confirmation',
    example: 'Votre solde est de 1500.5 MGA',
    type: String
  })
  message: string;
}