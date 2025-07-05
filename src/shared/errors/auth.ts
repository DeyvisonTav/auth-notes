import { UnauthorizedException } from "@nestjs/common";

export class AuthError {

  static unauthorized() {
    throw new UnauthorizedException('Token is required', {
      cause: 'Unauthorized',
      description: 'Token is required',
    });
  }

  static invalidToken() {
    throw new UnauthorizedException('Invalid token', {
      cause: 'Unauthorized',
      description: 'Invalid token',
    });
  }

  static tokenExpired() {
    throw new UnauthorizedException('Token expired', {
      cause: 'Unauthorized',
      description: 'Token expired',
    });
  }
}