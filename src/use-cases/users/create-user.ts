import { UserErrors } from "../../errors/user";
import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcrypt";

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

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw UserErrors.userAlreadyExists('User already exists', 400);
    }

    const passwordHash = await hash(password, 6);
    const _user = User.create({
      name,
      email,
      password: passwordHash,
    })
    const user = await this.userRepository.create(_user);

    return {
      user,
    }
  }
}