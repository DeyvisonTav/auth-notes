import { InMemoryNotesRepository } from "../../repositories/test/in-memory-notes-repository"
import { CreateNotes } from "./create-notes";
import { UpdateNotes } from "./update-notes"
import { InMemoryUserRepository } from "../../repositories/test/in-memory-user-repository";
import { CreateUser } from "../users/create-user";
import { NotesErrors } from "../../errors/notes";

let inMemoryNotesRepository: InMemoryNotesRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createNote: CreateNotes;
let createUser: CreateUser;
let sut: UpdateNotes;

describe('UpdateNotes', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createNote = new CreateNotes(inMemoryNotesRepository, inMemoryUserRepository);
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new UpdateNotes(inMemoryNotesRepository);
  })

  it('should be able to update a note', async () => {

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const note = await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: user.user.id,
    })

    const updatedNote = await sut.execute({
      id: note.notes.id,
      title: 'Note 2',
      content: 'Note 2 content',
    })

    expect(updatedNote.note.title).toBe('Note 2');
    expect(updatedNote.note.content).toBe('Note 2 content');
  })

  it("should not be able to update a note if the note does not exist", async () => {
    await expect(sut.execute({
      id: '123',
      title: 'Note 2',
      content: 'Note 2 content',
    })).rejects.toThrow(NotesErrors.noteNotFound('Note not found', 404));
  })
})