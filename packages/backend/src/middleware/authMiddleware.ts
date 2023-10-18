import { Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const authMiddleware = async (req: ExpressRequest, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.decodedToken = decodedToken;
    next();

  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Not authorized" });
  }
};