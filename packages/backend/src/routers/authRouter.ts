import { Router } from "express";
import { check } from "express-validator";

import AuthController from "../controllers/authController";

const router = Router();

router.post("/registration", [
  check("email", "Email cannot be empty").isEmail().notEmpty(),
  check("password").isLength({ min: 5, max: 32 }).withMessage("Password must be between 5 and 32 characters long").notEmpty()
], AuthController.registration);
router.post("/login", AuthController.login);

export default router;