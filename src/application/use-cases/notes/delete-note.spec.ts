import { InMemoryNotesRepository } from "../../../infrastructure/repositories/inMemory/in-memory-notes-repository"
import { DeleteNote } from "./delete-note"
import { CreateNotes } from "./create-notes"
import { InMemoryUserRepository } from "../../../infrastructure/repositories/inMemory/in-memory-user-repository";
import { NotesErrors } from "../../../shared/errors/notes";
import { CreateUser } from "../users/create-user";

let inMemoryNotesRepository: InMemoryNotesRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createNote: CreateNotes;
let createUser: CreateUser;
let sut: DeleteNote;

describe('DeleteNotes', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    createNote = new CreateNotes(inMemoryNotesRepository, inMemoryUserRepository);
    sut = new DeleteNote(inMemoryNotesRepository);
  })

  it('should be able to delete a note', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const notes = await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: user.user.id,
    })

    await sut.execute({
      id: notes.notes.id,
    })

    const note = await inMemoryNotesRepository.findById(notes.notes.id);
    expect(note).toBeNull();
  })

  it("should not be able to delete a note if the note does not exist", async () => {
    await expect(sut.execute({
      id: '123',
    })).rejects.toThrow(NotesErrors.noteNotFound('Note not found', 404));
  })
})