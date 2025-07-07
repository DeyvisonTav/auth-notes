import { InMemoryUserRepository } from "../../../infrastructure/repositories/inMemory/in-memory-user-repository"
import { AuthUsers } from "./auth-users"
import { CreateUser } from "../users/create-user"
import { JwtService } from "./jwt.service"

let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUser;
let jwtService: JwtService;
let sut: AuthUsers;

describe('AuthUsers', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    jwtService = new JwtService("test-secret-key");
    sut = new AuthUsers(inMemoryUserRepository, jwtService);
  })

  it('should be able to authenticate a user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const { token } = await sut.execute({
      email: 'john.doe@example.com',
      password: '123456',
    })
    expect(token).toBeDefined();
  })
})