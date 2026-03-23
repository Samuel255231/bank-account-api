import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Code d\'erreur HTTP',
    example: 404,
    type: Number
  })
  statusCode: number;

  @ApiProperty({
    description: 'Message d\'erreur',
    example: 'Compte non trouvé',
    type: String
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp de l\'erreur',
    example: '2024-01-01T00:00:00.000Z',
    type: String
  })
  timestamp: string;

  @ApiProperty({
    description: 'Chemin de la requête',
    example: '/accounts/check-balance',
    type: String
  })
  path: string;
}