import { Notes } from "../entities/notes";

export abstract class NotesRepository {
  abstract create(notes: Notes): Promise<Notes>;
  abstract findById(id: string): Promise<Notes | null>;
  abstract update(notes: Notes): Promise<void>;
  abstract delete(id: string): Promise<void>;
}