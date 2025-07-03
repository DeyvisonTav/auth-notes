import { Notes } from "../../entities/notes";
import { NotesRepository } from "../../repositories/notes-repository";

interface UpdateNotesRequest {
  id: string;
  title: string;
  content: string;
}

interface UpdateNotesResponse {
  note: Notes;
}

export class UpdateNotes {
  constructor(private notesRepository: NotesRepository) { }

  async execute({ id, title, content }: UpdateNotesRequest): Promise<UpdateNotesResponse> {
    const note = await this.notesRepository.findById(id);

    if (!note) {
      throw new Error('Note not found');
    }

    note.title = title;
    note.content = content;

    await this.notesRepository.update(note);

    return {
      note,
    }
  }
} 