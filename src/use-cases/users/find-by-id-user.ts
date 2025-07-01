import { User } from "src/entities/user";
import { UserRepository } from "src/repositories/user-repository";

interface FindByIdUserRequest {
  id: string
}

interface FindByIdUserResponse {
  user: User | null;
}
export class FindByIdUser {
  constructor(private userRepository: UserRepository) { }

  async execute({ id }: FindByIdUserRequest): Promise<FindByIdUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      user,
    }
  }
}