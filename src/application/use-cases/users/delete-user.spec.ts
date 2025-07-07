import { InMemoryUserRepository } from "../../../infrastructure/repositories/inMemory/in-memory-user-repository";
import { CreateUser } from "./create-user";
import { DeleteUser } from "./delete-user";
import { FindByIdUser } from "./find-by-id-user";
import { UserErrors } from "../../../shared/errors/user";

let inMemoryUserRepository: InMemoryUserRepository;
let findByIdUser: FindByIdUser;
let createUser: CreateUser;
let sut: DeleteUser;

describe("Delete User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    findByIdUser = new FindByIdUser(inMemoryUserRepository);
    sut = new DeleteUser(inMemoryUserRepository);
  })
  it("Should be able to delete a user and not find it", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "test@test.com",
      password: "123456",
    });
    await sut.execute({ id: user.user.id });
    await expect(findByIdUser.execute({ id: user.user.id })).rejects.toThrow(UserErrors.userNotFound('User not found', 404));
  })
})