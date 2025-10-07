import csurf from "csurf";
import cookieParser from "cookie-parser";
import { RequestHandler } from "express";

export const csrfProtection: RequestHandler = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});
