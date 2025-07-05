import { User } from "../../../domain/entities/user";
import { UserErrors } from "../../../shared/errors/user";
import { UserRepository } from "../../../domain/repositories/user-repository";

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