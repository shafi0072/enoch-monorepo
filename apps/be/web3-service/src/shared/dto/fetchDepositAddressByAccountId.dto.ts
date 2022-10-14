import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchDepositAddressByAccountId {
  @ApiProperty()
  @IsNotEmpty()
  accountId: string;
}
