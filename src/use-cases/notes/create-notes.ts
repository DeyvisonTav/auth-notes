import { Notes } from "src/entities/notes";
import { NotesRepository } from "src/repositories/notes-repository";

interface CreateNotesRequest {
  title: string;
  content: string;
}

interface CreateNotesResponse {
  notes: Notes;
}

export class CreateNotes {
  constructor(private notesRepository: NotesRepository) { }

  async execute({ title, content }: CreateNotesRequest): Promise<CreateNotesResponse> {
    const _notes = Notes.create({
      title,
      content,
    })

    const notes = await this.notesRepository.create(_notes);

    return {
      notes,
    }
  }
}