import { Notes } from "../../../domain/entities/notes";
import { NotesRepository } from "../../../domain/repositories/notes-repository";

interface FindByIdNotesRequest {
  id: string;
}

interface FindByIdNotesResponse {
  notes: Notes | null;
}
export class FindByIdNotes {
  constructor(private notesRepository: NotesRepository) { }

  async execute({ id }: FindByIdNotesRequest): Promise<FindByIdNotesResponse> {
    const notes = await this.notesRepository.findById(id);

    if (!notes) {
      throw new Error('Notes not found');
    }

    return {
      notes,
    }
  }
}