import Container from "typedi";
import { Router } from "express"; 
import { UserController } from "../controllers/UserController"; 
import { decodeIdToken, validateAccessToken } from "../middleware/auth.middleware";

const router = Router();

const userController = Container.get(UserController)

router.post("/create-profile", validateAccessToken, decodeIdToken, userController.onCreateProfile.bind(userController))

export default router;