import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HandleWebhookCallbackDto {
  @ApiProperty()
  @IsNotEmpty()
  signatureId: string;

  @ApiPropertyOptional()
  @IsOptional()
  txId: string;

  @ApiProperty()
  @IsNotEmpty()
  subscriptionType: string;

  @ApiPropertyOptional()
  @IsOptional()
  error: string;
}
