import jwt from "jsonwebtoken";
import { IJWTService } from '../../application/services/IJWTService';

export class JWTService implements IJWTService {
  constructor(
    private readonly secretKey: string,
  ) {}

  public sign(payload: object, expiresInSeconds?: number): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: expiresInSeconds,
    });
  }

  public verify(token: string): object | null {
    return jwt.verify(token, this.secretKey) as object;
  }
}