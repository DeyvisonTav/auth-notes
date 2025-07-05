import { Notes } from "../../../domain/entities/notes";
import { NotesRepository } from "../../../domain/repositories/notes-repository";


interface FindAllNotesResponse {
  notes: Notes[];
}

export class FindAllNotes {
  constructor(private notesRepository: NotesRepository) { }

  async execute(): Promise<FindAllNotesResponse> {
    const notes = await this.notesRepository.findAll();

    return {
      notes,
    }
  }
}