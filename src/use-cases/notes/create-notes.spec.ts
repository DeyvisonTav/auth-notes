import { InMemoryNotesRepository } from "../../repositories/test/in-memory-notes-repository";
import { CreateNotes } from "./create-notes";
import { CreateUser } from "../users/create-user";
import { InMemoryUserRepository } from "../../repositories/test/in-memory-user-repository";

let inMemoryNotesRepository: InMemoryNotesRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUser;
let sut: CreateNotes;

describe("Create Notes", () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new CreateNotes(inMemoryNotesRepository);
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
})