import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcrypt";

interface UpdateUsersRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UpdateUsersResponse {
  user: User;
}

export class UpdateUsers {
  constructor(private userRepository: UserRepository) { }

  async execute({ id, name, email, password }: UpdateUsersRequest): Promise<UpdateUsersResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.name = name;
    user.email = email;
    user.password = await hash(password, 6);

    await this.userRepository.update(user);

    return { user };
  }
}