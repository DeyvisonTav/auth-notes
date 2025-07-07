import { InMemoryNotesRepository } from "../../../infrastructure/repositories/inMemory/in-memory-notes-repository"
import { InMemoryUserRepository } from "../../../infrastructure/repositories/inMemory/in-memory-user-repository"
import { CreateNotes } from "../notes/create-notes";
import { FindByIdNotes } from "./find-by-id-notes";
import { CreateUser } from "../users/create-user";

let inMemoryNotesRepository: InMemoryNotesRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createNote: CreateNotes;
let createUser: CreateUser;
let sut: FindByIdNotes;


describe('FindByIdNotes', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createNote = new CreateNotes(inMemoryNotesRepository, inMemoryUserRepository);
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new FindByIdNotes(inMemoryNotesRepository);
  });

  it('should be able to find a note by id', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const notes = await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: user.user.id,
    });

    const note = await sut.execute({
      id: notes.notes.id,
    });

    expect(note).toBeTruthy();
  });
})