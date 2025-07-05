import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteNoteDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}