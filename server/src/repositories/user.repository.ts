import { pool } from "../db";
import { User } from "../models/user.model";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return res.rows[0] || null;
  }

  async create(email: string, password: string, name?: string): Promise<User> {
    const res = await pool.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
      [email, password, name],
    );
    return res.rows[0];
  }
}
