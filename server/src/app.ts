import express, { Application } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import { csrfProtection } from "./middlewares/csrf.middleware";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(helmet()); // security headers
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // CSRF protection
    this.app.use(csrfProtection);

    // Optional: expose CSRF token endpoint for SPA
    this.app.get("/api/csrf-token", (req, res) => {
      // @ts-ignore csurf adds req.csrfToken()
      res.json({ csrfToken: req.csrfToken() });
    });
  }

  private setupRoutes(): void {
    this.app.use("/api/auth", authRoutes);
  }

  public getApp(): Application {
    return this.app;
  }
}
