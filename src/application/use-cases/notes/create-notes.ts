import { UserRepository } from "../../../domain/repositories/user-repository";
import { Notes } from "../../../domain/entities/notes";
import { NotesRepository } from "../../../domain/repositories/notes-repository";
import { NotesErrors } from "../../../shared/errors/notes";

interface CreateNotesRequest {
  title: string;
  content: string;
  userId: string;
}

interface CreateNotesResponse {
  notes: Notes;
}

export class CreateNotes {
  constructor(private notesRepository: NotesRepository, private userRepository: UserRepository) { }

  async execute({ title, content, userId }: CreateNotesRequest): Promise<CreateNotesResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw NotesErrors.noteInvalidUserId('User not found', 404);
    }
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