import Container from "typedi";
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const authController = Container.get(AuthController)
router.post("/signup", authController.onSignUp.bind(authController))

export default router;