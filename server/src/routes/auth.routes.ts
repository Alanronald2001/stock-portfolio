import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { body } from "express-validator";
import { runValidation } from "../middlewares/validation.middleware";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "../utils/jwt";

const router = Router();

// Instantiate classes
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const jwtService = new JwtService();
const authController = new AuthController(authService, jwtService);

router.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  runValidation,
  authController.register,
);

router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  runValidation,
  authController.login,
);

router.post("/logout", authController.logout);

export default router;
