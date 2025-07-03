import { InMemoryUserRepository } from "../../repositories/test/in-memory-user-repository"
import { compare } from "bcrypt"
import { CreateUser } from "./create-user"
import { UpdateUsers } from "./update-users"

let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUser;
let sut: UpdateUsers;

describe('UpdateUsers', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    sut = new UpdateUsers(inMemoryUserRepository);
  })

  it('should be able to update a user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const updatedUser = await sut.execute({
      id: user.user.id,
      name: 'John Doe 2',
      email: 'john.doe2@example.com',
      password: '123456789',
    })

    expect(updatedUser.user.name).toBe('John Doe 2');
    expect(updatedUser.user.email).toBe('john.doe2@example.com');
    expect(await compare('123456789', updatedUser.user.password)).toBeTruthy();
  })

  it('should not be able to update a user if the user does not exist', async () => {
    await expect(sut.execute({
      id: 'non-existing-id',
      name: 'John Doe 2',
      email: 'john.doe2@example.com',
      password: '123456789',
    })).rejects.toThrow('User not found');
  })
})