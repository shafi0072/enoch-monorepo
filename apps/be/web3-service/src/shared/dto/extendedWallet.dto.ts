import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExtendedWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  chain: string;

  @ApiProperty()
  @IsNotEmpty()
  isTestnet: boolean;
}
