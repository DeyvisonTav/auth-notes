import { NotesRepository } from "../../../domain/repositories/notes-repository";
import { Repository } from "typeorm";
import { Notes } from "../../../domain/entities/notes";

export class TypeormNotesRepository extends NotesRepository {
  constructor(private readonly notesRepository: Repository<Notes>) {
    super();
  }

  async create(notes: Notes): Promise<Notes> {
    return this.notesRepository.save(notes);
  }

  async findById(id: string): Promise<Notes | null> {
    return this.notesRepository.findOne({ where: { id } });
  }

  async update(notes: Notes): Promise<void> {
    await this.notesRepository.update(notes.id, notes);
  }

  async delete(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<Notes[] | null> {
    return this.notesRepository.find({ where: { userId } });
  }

  async findAll(): Promise<Notes[]> {
    return this.notesRepository.find();
  }
}