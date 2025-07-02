import { Notes } from "src/entities/notes";
import { NotesRepository } from "../notes-repository";

export class InMemoryNotesRepository extends NotesRepository {
  private notes: Notes[] = []

  async create(notes: Notes): Promise<Notes> {
    this.notes.push(notes);
    return notes;
  }

  async findById(id: string): Promise<Notes | null> {
    const note = this.notes.find(note => note.id === id) ?? null;
    return note;
  }

  async update(notes: Notes): Promise<void> {
    const noteIndex = this.notes.findIndex(note => note.id === notes.id);
    this.notes[noteIndex] = notes;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}