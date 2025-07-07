import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateUser } from '../../application/use-cases/users/create-user';
import { DeleteUser } from '../../application/use-cases/users/delete-user';
import { FindAllUsers } from '../../application/use-cases/users/find-all-users';
import { FindByIdUser } from '../../application/use-cases/users/find-by-id-user';
import { UpdateUsers } from '../../application/use-cases/users/update-users';
import { CreateUserDto } from '../dtos/users/create';
import { FindByIdUserDto } from '../dtos/users/find-by-id';
import { UpdateUserDto } from '../dtos/users/update';
import { DeleteUserDto } from '../dtos/users/delete';
import { User } from '../../domain/entities/user';
import { AuthMiddleware } from '../middlewares/auth-middleware';

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
  @UseGuards(AuthMiddleware)
  async findUserById(@Param() findByIdUserDto: FindByIdUserDto): Promise<User | null> {
    const { user } = await this.findUserByIdUseCase.execute(findByIdUserDto);
    return user;
  }

  @Put(':id')
  @UseGuards(AuthMiddleware)
  async updateUser(@Param() updateUserDto: UpdateUserDto): Promise<User | null> {
    const { user } = await this.updateUserUseCase.execute(updateUserDto);
    return user;
  }

  @Delete(':id')
  @UseGuards(AuthMiddleware)
  async deleteUser(@Param() deleteUserDto: DeleteUserDto): Promise<void> {
    await this.deleteUserUseCase.execute(deleteUserDto);
  }

  @Get()
  @UseGuards(AuthMiddleware)
  async findAllUsers(): Promise<User[]> {
    const { users } = await this.findAllUsersUseCase.execute();
    return users;
  }
}