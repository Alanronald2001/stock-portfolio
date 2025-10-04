import { IUser, User } from "../models/User";

const users: IUser[] = [
  new User(1, "Alice", "alice@example.com"),
  new User(2, "Bob", "bob@example.com"),
];

class UserRepository {
  static async getAll(): Promise<IUser[]> {
    return users;
  }
}

export default UserRepository;
