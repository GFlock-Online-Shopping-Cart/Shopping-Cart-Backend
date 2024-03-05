import { Router} from "express";
import { AuthController } from "../controllers/AuthController";
import Container from "typedi";

const router = Router();

const authController = Container.get(AuthController)
router.post("/signup", authController.onSignUp.bind(authController))

export default router;