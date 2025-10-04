import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes";

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api/users", userRoutes);
  }
}

export default new App().app;
