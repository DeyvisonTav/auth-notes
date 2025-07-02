import { User } from "src/entities/user";
import { UserRepository } from "../user-repository";

export class InMemoryUserRepository extends UserRepository {
  private users: User[] = []

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email) ?? null;
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id) ?? null;
    return user;
  }

  async update(user: User): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === user.id);
    this.users[userIndex] = user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }
}