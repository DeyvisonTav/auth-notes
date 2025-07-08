import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthError } from "src/shared/errors/auth";
import { JwtService } from '@nestjs/jwt';
import { User } from "src/domain/entities/user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  async use(req: Request, _: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    if (!token) {
      AuthError.unauthorized();
    }

    const [, tokenValue] = token.split(' ');

    if (!tokenValue) {
      AuthError.unauthorized();
    }

    try {
      const decoded = await this.jwtService.verify(tokenValue, {
        secret: process.env.JWT_SECRET,
      });

      req.user = new User({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        password: decoded.password,
        createdAt: decoded.createdAt,
        updatedAt: decoded.updatedAt,
      });

      next();
    } catch (error) {
      AuthError.invalidToken();
    }
  }
}