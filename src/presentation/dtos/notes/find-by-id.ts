import { IsNotEmpty, IsString } from 'class-validator';

export class FindByIdNoteDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}