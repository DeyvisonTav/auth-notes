import { UserErrors } from "../../../shared/errors/user";
import { UserRepository } from "../../../domain/repositories/user-repository";

interface DeleteUserRequest {
  id: string;
}



export class DeleteUser {
  constructor(private userRepository: UserRepository) { }

  async execute({ id }: DeleteUserRequest): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw UserErrors.userNotFound('User not found', 404);
    }
    await this.userRepository.delete(user.id);
  }
}