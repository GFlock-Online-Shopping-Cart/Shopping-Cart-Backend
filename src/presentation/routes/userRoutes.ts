import Container from "typedi";
import { Router } from "express"; 
import { UserController } from "../controllers/UserController"

const router = Router();

const userController = Container.get(UserController)

router.get("/getAllUsers", userController.onGetAllUsers.bind(userController))
router.get("/getUserById/:userId", userController.onGetUserById.bind(userController))

export default router;