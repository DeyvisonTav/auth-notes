import { compare } from "bcrypt";
import { InMemoryUserRepository } from "../../../infrastructure/repositories/inMemory/in-memory-user-repository"
import { CreateUser } from "./create-user"
import { FindAllUsers } from "./find-all-users"

let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUser;
let sut: FindAllUsers;

describe('FindAllUsers', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new FindAllUsers(inMemoryUserRepository);
  })

  it('should be able to find all users', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const users = await sut.execute();

    expect(users.users).toHaveLength(1);
    expect(users.users[0].name).toBe('John Doe');
    expect(users.users[0].email).toBe('john.doe@example.com');
    expect(await compare('123456', users.users[0].password)).toBeTruthy();
  })
})