import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../application/userService'; 

export class UserController {
    constructor(private userService: UserService) {}

    async onGetAllUsers(req: Request, res:Response, next: NextFunction) {
        const allUsers = await this.userService.getAllUsers()
        res.status(200).json({message: "success", data: allUsers});
    }

    async onGetUserById(req: Request, res: Response, next: NextFunction) {
        const userId = Number(req.params.userId);
        const user = await this.userService.getUserById(userId);
        res.status(200).json({message: "success", data: user});

    }

    // async onGetUser(req: Request, res: Response, next: NextFunction) {
    //     const userId = Number(req.params.userId);
    //     const userService = new UserService(new UserRepository());
    //     const user = await userService.getUserById(userId);
    //     if(user) {
    //         res.json(user);
    //     } else {
    //         res.status(404).json({ message: 'user not found' });
    //     }
    // }
}








// const router = Router();

// router.get('/users', async(req, res) => {
//     const userService = new UserService(new UserRepository());
//     const users = await userService.getAllUsers();
//     res.json(users);
// });

// router.get('/users/:userId', async(req, res) => {
//     const userId = Number(req.params.userId);
//     const userService = new UserService(new UserRepository());
//     const user = await userService.getUserById(userId);
//     if(user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: 'user not found' });
//     }
// });

// export default router;