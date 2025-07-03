import { UserRepository } from "../../repositories/user-repository";
import { compare } from "bcrypt";
import { JwtService } from "./jwt.service";

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
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
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