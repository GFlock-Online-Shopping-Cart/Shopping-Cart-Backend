import Container from "typedi";
import { Router } from "express"; 
import { UserController } from "../controllers/UserController"; 
import { decodeAccessToken, validateAccessToken } from "../middleware/auth.middleware";
import { ValidationMiddleware } from "../middleware/validation.middleware";
import { CreateProfileDTO } from "../dto/user.dto";

const router = Router();

const userController = Container.get(UserController)

router.post("/create-profile", ValidationMiddleware(CreateProfileDTO), validateAccessToken, decodeAccessToken, userController.onCreateProfile.bind(userController))
router.get("/get-profile/:userId", validateAccessToken, decodeAccessToken, userController.onGetProfileById.bind(userController))
export default router;