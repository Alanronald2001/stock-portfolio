import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;
