import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user-repository";



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