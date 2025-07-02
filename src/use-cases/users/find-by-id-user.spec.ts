import { InMemoryUserRepository } from "../../repositories/test/in-memory-user-repository";
import { FindByIdUser } from "./find-by-id-user";
import { CreateUser } from "./create-user";

let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUser;
let sut: FindByIdUser;



describe("Find By Id User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new FindByIdUser(inMemoryUserRepository);
  })
  it("should be able to find a user by id", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "test@test.com",
      password: "123456",
    });
    const userFound = await sut.execute({ id: user.user.id });
    expect(userFound.user).toBeTruthy();
  });
});