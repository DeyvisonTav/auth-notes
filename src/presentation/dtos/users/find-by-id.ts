import { IsNotEmpty, IsString } from 'class-validator';

export class FindByIdUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}