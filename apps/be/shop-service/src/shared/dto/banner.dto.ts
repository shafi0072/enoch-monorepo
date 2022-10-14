import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  name?: string;
}
