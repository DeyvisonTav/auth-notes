import { Notes } from "../../entities/notes";
import { NotesRepository } from "../../repositories/notes-repository";

interface CreateNotesRequest {
  title: string;
  content: string;
  userId: string;
}

interface CreateNotesResponse {
  notes: Notes;
}

export class CreateNotes {
  constructor(private notesRepository: NotesRepository) { }

  async execute({ title, content, userId }: CreateNotesRequest): Promise<CreateNotesResponse> {
    const _notes = Notes.create({
      title,
      content,
      userId,
    })

    const notes = await this.notesRepository.create(_notes);

    return {
      notes,
    }
  }
}