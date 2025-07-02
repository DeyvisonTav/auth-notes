import { UserRepository } from "../../repositories/user-repository";

interface DeleteUserRequest {
  id: string;
}



export class DeleteUser {
  constructor(private userRepository: UserRepository) { }

  async execute({ id }: DeleteUserRequest): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(user.id);
  }
}