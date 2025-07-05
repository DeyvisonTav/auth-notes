import { InMemoryNotesRepository } from "../../../infrastructure/repositories/in-memory-notes-repository";
import { CreateNotes } from "./create-notes";
import { CreateUser } from "../users/create-user";
import { InMemoryUserRepository } from "../../../infrastructure/repositories/in-memory-user-repository";
import { NotesErrors } from "../../../shared/errors/notes";

let inMemoryNotesRepository: InMemoryNotesRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUser;
let sut: CreateNotes;

describe("Create Notes", () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new CreateNotes(inMemoryNotesRepository, inMemoryUserRepository);
  })
  it("Should be able create a new note", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "test@test.com",
      password: "123456",
    });
    const { notes } = await sut.execute({
      title: "Note 1",
      content: "Content 1",
      userId: user.user.id,
    });
    expect(notes.id).toBeTruthy();
    expect(notes.title).toBe("Note 1");
    expect(notes.content).toBe("Content 1");
    expect(notes.userId).toBe(user.user.id);
  })

  it("should not be able to create a new note if the user does not exist", async () => {
    await expect(sut.execute({
      title: "Note 1",
      content: "Content 1",
      userId: "123",
    })).rejects.toThrow(NotesErrors.noteInvalidUserId('User not found', 404));
  })
})