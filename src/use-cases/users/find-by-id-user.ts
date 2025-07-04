import { User } from "../../entities/user";
import { UserErrors } from "../../errors/user";
import { UserRepository } from "../../repositories/user-repository";

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
      throw UserErrors.userNotFound('User not found', 404);
    }

    return {
      user,
    }
  }
}