import { Router } from "express"; 
import { UserController } from "../controllers/UserController"
import { UserService } from "../../application/userService";
import { UserRepository } from "../../infrastructure/repositories/userReporitory";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/getAllUsers", userController.onGetAllUsers.bind(userController))
router.get("/getUserById/:userId", userController.onGetUserById.bind(userController))

export default router;