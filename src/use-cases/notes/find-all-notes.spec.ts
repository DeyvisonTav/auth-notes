import { InMemoryNotesRepository } from "../../repositories/test/in-memory-notes-repository"
import { FindAllNotes } from "./find-all-notes"
import { CreateNotes } from "./create-notes"

let inMemoryNotesRepository: InMemoryNotesRepository;
let createNote: CreateNotes;
let sut: FindAllNotes;

describe('FindAllNotes', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    createNote = new CreateNotes(inMemoryNotesRepository);
    sut = new FindAllNotes(inMemoryNotesRepository);
  })

  it('should be able to find all notes', async () => {
    const note = await createNote.execute({
      title: 'Note 1',
      content: 'Note 1 content',
      userId: 'user-1',
    })

    const notes = await sut.execute();

    expect(notes.notes).toHaveLength(1);
    expect(notes.notes[0].title).toBe('Note 1');
    expect(notes.notes[0].content).toBe('Note 1 content');
  })
})