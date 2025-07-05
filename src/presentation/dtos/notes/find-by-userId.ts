import { IsNotEmpty, IsString } from 'class-validator';

export class FindByUserIdDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}