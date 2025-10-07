import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export class AuthService {
  private userRepo: UserRepository;
  private readonly SALT_ROUNDS = 12;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async registerUser(
    email: string,
    password: string,
    name?: string,
  ): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    return this.userRepo.create(email, hashedPassword, name);
  }

  async verifyUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }
}
