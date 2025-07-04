import { NotesErrors } from "../../errors/notes";
import { NotesRepository } from "../../repositories/notes-repository";

interface DeleteNoteRequest {
  id: string;
}

export class DeleteNote {
  constructor(private notesRepository: NotesRepository) { }

  async execute({ id }: DeleteNoteRequest): Promise<void> {
    const note = await this.notesRepository.findById(id);

    if (!note) {
      throw NotesErrors.noteNotFound('Note not found', 404);
    }

    await this.notesRepository.delete(id);
  }
}