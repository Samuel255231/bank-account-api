import { ApiProperty } from '@nestjs/swagger';

export class WithdrawResponseDto {
  @ApiProperty({
    description: 'Message de résultat de l\'opération',
    example: 'retrait effectué avec succés',
    type: String
  })
  message: string;

  @ApiProperty({
    description: 'Nouveau solde après retrait (présent uniquement si succès)',
    example: 1400.50,
    required: false,
    type: Number
  })
  newBalance?: number;
}