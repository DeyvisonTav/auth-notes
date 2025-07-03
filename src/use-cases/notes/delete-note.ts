import { NotesRepository } from "../../repositories/notes-repository";

interface DeleteNoteRequest {
  id: string;
}

export class DeleteNote {
  constructor(private notesRepository: NotesRepository) { }

  async execute({ id }: DeleteNoteRequest): Promise<void> {
    const note = await this.notesRepository.findById(id);

    if (!note) {
      throw new Error('Note not found');
    }

    await this.notesRepository.delete(id);
  }
}