import { InMemoryNotesRepository } from "../../repositories/test/in-memory-notes-repository"
import { DeleteNote } from "./delete-note"
import { CreateNotes } from "./create-notes"

let inMemoryNotesRepository: InMemoryNotesRepository;
let createNote: CreateNotes;
let sut: DeleteNote;

describe('DeleteNotes', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    createNote = new CreateNotes(inMemoryNotesRepository);
    sut = new DeleteNote(inMemoryNotesRepository);
  })

  it('should be able to delete a note', async () => {
    const notes = await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: 'user-1',
    })

    await sut.execute({
      id: notes.notes.id,
    })

    const note = await inMemoryNotesRepository.findById(notes.notes.id);
    expect(note).toBeNull();
  })
})