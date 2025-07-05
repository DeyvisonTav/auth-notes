import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException } from "@nestjs/common";
import { CreateNoteDto } from "../dtos/notes/create";
import { FindByIdNoteDto } from "../dtos/notes/find-by-id";
import { FindByUserIdDto } from "../dtos/notes/find-by-userId";
import { DeleteNoteDto } from "../dtos/notes/delete";
import { UpdateNoteDto } from "../dtos/notes/update";
import { FindAllNotes } from "../../application/use-cases/notes/find-all-notes";
import { CreateNotes } from "../../application/use-cases/notes/create-notes";
import { FindByIdNotes } from "../../application/use-cases/notes/find-by-id-notes";
import { UpdateNotes } from "../../application/use-cases/notes/update-notes";
import { DeleteNote } from "../../application/use-cases/notes/delete-note";
import { FindNotesByUser } from "../../application/use-cases/notes/find-notes-by-user";
import { Notes } from "../../domain/entities/notes";
import { NotesErrors } from "../../shared/errors/notes";

@Controller('notes')
export class NotesController {
  constructor(
    private readonly createNoteUseCase: CreateNotes,
    private readonly findAllNotesUseCase: FindAllNotes,
    private readonly findNoteByIdUseCase: FindByIdNotes,
    private readonly updateNoteUseCase: UpdateNotes,
    private readonly deleteNoteUseCase: DeleteNote,
    private readonly findByUserIdUseCase: FindNotesByUser,
  ) { }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<Notes> {
    const { notes } = await this.createNoteUseCase.execute(createNoteDto);
    return notes;
  }

  @Get(':id')
  async findNoteById(@Param() findByIdNoteDto: FindByIdNoteDto): Promise<Notes | null> {
    const { notes } = await this.findNoteByIdUseCase.execute(findByIdNoteDto);
    if (!notes) {
      throw NotesErrors.noteNotFound('Note not found', 404);
    }
    return notes;
  }

  @Put(':id')
  async updateNote(@Param() updateNoteDto: UpdateNoteDto): Promise<Notes | null> {
    const { note } = await this.updateNoteUseCase.execute(updateNoteDto);
    if (!note) {
      throw NotesErrors.noteNotFound('Note not found', 404);
    }
    return note;
  }

  @Delete(':id')
  async deleteNote(@Param() deleteNoteDto: DeleteNoteDto): Promise<void> {
    await this.deleteNoteUseCase.execute(deleteNoteDto);
  }

  @Get('user/:userId')
  async findNotesByUser(@Param() findByUserIdDto: FindByUserIdDto): Promise<Notes[]> {
    const { notes } = await this.findByUserIdUseCase.execute(findByUserIdDto);
    return notes;
  }

  @Get()
  async findAllNotes(): Promise<Notes[]> {
    const { notes } = await this.findAllNotesUseCase.execute();
    return notes;
  }

}