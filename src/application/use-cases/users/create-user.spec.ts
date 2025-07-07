import { UserErrors } from "../../../shared/errors/user";
import { InMemoryUserRepository } from "../../../infrastructure/repositories/inMemory/in-memory-user-repository";
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

  it("Should not be able to create a new user with an email that already exists", async () => {
    await sut.execute({
      email: "test@test.com",
      name: "John Doe",
      password: "123456",
    })
    await expect(sut.execute({
      email: "test@test.com",
      name: "John Doe",
      password: "123456",
    })).rejects.toThrow(UserErrors.userAlreadyExists('User already exists', 400));
  })
})