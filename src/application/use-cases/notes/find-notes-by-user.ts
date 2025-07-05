import { NotesErrors } from "../../../shared/errors/notes";
import { Notes } from "../../../domain/entities/notes";
import { NotesRepository } from "../../../domain/repositories/notes-repository";

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
      throw NotesErrors.noteNotFound('Notes not found', 404);
    }

    return {
      notes,
    };
  }
}