import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchVirtualAccounts {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
