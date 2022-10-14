import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVirtualWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  chain: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
