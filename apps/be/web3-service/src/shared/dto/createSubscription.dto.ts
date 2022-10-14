import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  type: number;

  @ApiPropertyOptional()
  @IsOptional()
  chain: string;

  @ApiPropertyOptional()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  url: string;
}
