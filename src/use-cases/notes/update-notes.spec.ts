import { InMemoryNotesRepository } from "../../repositories/test/in-memory-notes-repository"
import { CreateNotes } from "./create-notes";
import { UpdateNotes } from "./update-notes"

let inMemoryNotesRepository: InMemoryNotesRepository;
let createNote: CreateNotes;
let sut: UpdateNotes;

describe('UpdateNotes', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    createNote = new CreateNotes(inMemoryNotesRepository);
    sut = new UpdateNotes(inMemoryNotesRepository);
  })

  it('should be able to update a note', async () => {
    const note = await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: 'user-1',
    })

    const updatedNote = await sut.execute({
      id: note.notes.id,
      title: 'Note 2',
      content: 'Note 2 content',
    })

    expect(updatedNote.note.title).toBe('Note 2');
    expect(updatedNote.note.content).toBe('Note 2 content');
  })
})