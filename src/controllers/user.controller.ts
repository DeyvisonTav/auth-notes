import { Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateUser } from 'src/use-cases/users/create-user';
import { DeleteUser } from 'src/use-cases/users/delete-user';
import { FindAllUsers } from 'src/use-cases/users/find-all-users';
import { FindByIdUser } from 'src/use-cases/users/find-by-id-user';
import { UpdateUsers } from '../use-cases/users/update-users';
import { CreateUserDto } from '../dtos/user/create';
import { FindByIdUserDto } from '../dtos/user/find-by-id';
import { UpdateUserDto } from '../dtos/user/update';
import { DeleteUserDto } from '../dtos/user/delete';
import { User } from '../entities/user';
import { UserErrors } from 'src/errors/user';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly findAllUsersUseCase: FindAllUsers,
    private readonly findUserByIdUseCase: FindByIdUser,
    private readonly updateUserUseCase: UpdateUsers,
    private readonly deleteUserUseCase: DeleteUser,
  ) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { user } = await this.createUserUseCase.execute(createUserDto);
    return user;
  }
  @Get(':id')
  async findUserById(@Param() findByIdUserDto: FindByIdUserDto): Promise<User | null> {
    const { user } = await this.findUserByIdUseCase.execute(findByIdUserDto);
    if (!user) {
      throw UserErrors.userNotFound('User not found', 404);
    }
    return user;
  }

  @Put(':id')
  async updateUser(@Param() updateUserDto: UpdateUserDto): Promise<User | null> {
    const { user } = await this.updateUserUseCase.execute(updateUserDto);
    if (!user) {
      throw UserErrors.userNotFound('User not found', 404);
    }
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param() deleteUserDto: DeleteUserDto): Promise<void> {
    await this.deleteUserUseCase.execute(deleteUserDto);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    const { users } = await this.findAllUsersUseCase.execute();
    return users;
  }
}