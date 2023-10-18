import express from "express";
import { validationResult } from "express-validator";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../config/database";

const generateAccessToken = (id: number, email: string) => {
  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class AuthController {
  async registration(req: express.Request, res: express.Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }

      const { email, password } = req.body;
      const candidate = await prisma.user.findUnique({ where: { email } });

      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const user = await prisma.user.create({ data: { email, password: hashPassword } });

      const token = generateAccessToken(user.id, user.email);

      return res.json({ token, message: "User was created" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Registration error" });

    }
  }
  async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: `User ${email} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = generateAccessToken(user.id, user.email);

      return res.json({ token });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Login error" });
    }
  }
}

export default new AuthController();