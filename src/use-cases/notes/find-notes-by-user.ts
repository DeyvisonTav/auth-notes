import { Notes } from "../../entities/notes";
import { NotesRepository } from "../../repositories/notes-repository";

interface FindNotesByUserRequest {
  userId: string;
}

interface FindNotesByUserResponse {
  notes: Notes[];
}

export class FindNotesByUser {
  constructor(private notesRepository: NotesRepository) { }

  async execute({ userId }: FindNotesByUserRequest): Promise<FindNotesByUserResponse> {
    const notes = await this.notesRepository.findByUserId(userId);
    if (!notes) {
      throw new Error('Notes not found');
    }

    return {
      notes,
    };
  }
}