import { InMemoryNotesRepository } from "../../../infrastructure/repositories/inMemory/in-memory-notes-repository"
import { InMemoryUserRepository } from "../../../infrastructure/repositories/inMemory/in-memory-user-repository"
import { CreateNotes } from "../notes/create-notes"
import { CreateUser } from "../users/create-user"
import { FindNotesByUser } from "./find-notes-by-user"

let inMemoryNotesRepository: InMemoryNotesRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createNote: CreateNotes;
let createUser: CreateUser;
let sut: FindNotesByUser;

describe('FindNotesByUser', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createNote = new CreateNotes(inMemoryNotesRepository, inMemoryUserRepository);
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new FindNotesByUser(inMemoryNotesRepository);
  })

  it('should be able to find notes by user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: user.user.id,
    });

    const notes = await sut.execute({
      userId: user.user.id,
    });

    expect(notes).toBeTruthy();
  })


})