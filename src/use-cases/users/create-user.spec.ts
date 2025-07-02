import { InMemoryUserRepository } from "../../repositories/test/in-memory-user-repository";
import { CreateUser } from "./create-user";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateUser;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreateUser(inMemoryUserRepository);
  })
  it("Should be able create a new user", async () => {
    const { user } = await sut.execute({
      email: "test@test.com",
      name: "John Doe",
      password: "123456",
    })
    expect(user.id).toBeTruthy();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("test@test.com");
    expect(user.password).toBeTruthy();

  })
})