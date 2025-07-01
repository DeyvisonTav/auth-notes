import { User } from "src/entities/user";
import { UserRepository } from "src/repositories/user-repository";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(private userRepository: UserRepository) { }

  async execute({ email, name, password }: CreateUserRequest): Promise<CreateUserResponse> {
    const _user = User.create({
      name,
      email,
      password,
    })
    const user = await this.userRepository.create(_user);

    return {
      user,
    }
  }
}