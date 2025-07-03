import { Notes } from "../entities/notes";

export abstract class NotesRepository {
  abstract create(notes: Notes): Promise<Notes>;
  abstract findById(id: string): Promise<Notes | null>;
  abstract findAll(): Promise<Notes[]>;
  abstract update(notes: Notes): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<Notes[] | null>;
}