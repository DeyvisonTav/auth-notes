import { InMemoryNotesRepository } from "../../../infrastructure/repositories/in-memory-notes-repository"
import { FindAllNotes } from "./find-all-notes"
import { CreateNotes } from "./create-notes"
import { InMemoryUserRepository } from "../../../infrastructure/repositories/in-memory-user-repository";
import { NotesErrors } from "../../../shared/errors/notes";
import { CreateUser } from "../users/create-user";

let inMemoryNotesRepository: InMemoryNotesRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUser;
let createNote: CreateNotes;
let sut: FindAllNotes;

describe('FindAllNotes', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    createNote = new CreateNotes(inMemoryNotesRepository, inMemoryUserRepository);
    sut = new FindAllNotes(inMemoryNotesRepository);
  })


  it('should be able to find all notes', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });


    await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: user.user.id,
    })

    const notes = await sut.execute();

    expect(notes.notes).toHaveLength(1);
    expect(notes.notes[0].title).toBe('Note 1');
    expect(notes.notes[0].content).toBe('Note 1 content');
  });
})