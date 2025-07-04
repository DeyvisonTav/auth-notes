import { UserRepository } from "../../repositories/user-repository";
import { compare } from "bcrypt";
import { JwtService } from "./jwt.service";
import { UserErrors } from "../../errors/user";

interface AuthUsersRequest {
  email: string;
  password: string;
}

interface AuthUsersResponse {
  token: string;
}

export class AuthUsers {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

  async execute({ email, password }: AuthUsersRequest): Promise<AuthUsersResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw UserErrors.userNotFound('User not found', 404);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw UserErrors.userInvalidPassword('Invalid password', 401);
    }
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    }
    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    return {
      token,
    }
  }
}