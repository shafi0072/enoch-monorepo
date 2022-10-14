import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSignatureIdStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  signatureId: string;
}
