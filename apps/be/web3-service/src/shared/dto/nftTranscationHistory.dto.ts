import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetNftTransactionHistory {
  @ApiProperty()
  @IsNotEmpty()
  chain: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  tokenAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;

  @ApiPropertyOptional()
  @IsOptional()
  offset: number;

  @ApiPropertyOptional()
  @IsOptional()
  from: number;

  @ApiPropertyOptional()
  @IsOptional()
  to: number;
}
