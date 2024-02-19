import {NextFunction, Response, Request, Router} from "express";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../../infrastructure/repositories/userReporitory";
import { AuthService } from "../../application/authService";

const router = Router();

const userReporitory = new UserRepository();
const authService = new AuthService(userReporitory);
const authController = new AuthController(authService);

router.post("/signup", authController.onSignUp.bind(authController))

export default router;