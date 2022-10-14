import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CancelSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
