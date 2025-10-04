import UserRepository from "../repositories/UserRepository";
import { IUser } from "../models/User";

class UserService {
  static async getUsers(): Promise<IUser[]> {
    return UserRepository.getAll();
  }
}

export default UserService;
