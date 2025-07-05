import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user-repository";



interface FindAllUsersResponse {
  users: User[];
}


export class FindAllUsers {
  constructor(private userRepository: UserRepository) { }

  async execute(): Promise<FindAllUsersResponse> {
    const users = await this.userRepository.findAll();

    return {
      users,
    };
  }
}