import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export class JwtService {
  sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T;
  }
}
