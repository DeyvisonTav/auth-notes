import { User } from "src/domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user-repository";
import { Repository } from "typeorm";
export class TypeormUserRepository extends UserRepository {
  constructor(private readonly userRepository: Repository<User>) {
    super()
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user.id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}