import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { JwtService } from "../utils/jwt";

export class AuthController {
  private authService: AuthService;
  private jwtService: JwtService;

  constructor(authService: AuthService, jwtService: JwtService) {
    this.authService = authService;
    this.jwtService = jwtService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const user = await this.authService.registerUser(email, password, name);
      res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.verifyUser(email, password);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const token = this.jwtService.sign({ sub: user.id, email: user.email });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });

      res.json({ message: "Logged in" });
    } catch (err: any) {
      res.status(500).json({ error: "Server error" });
    }
  };

  logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  };
}
