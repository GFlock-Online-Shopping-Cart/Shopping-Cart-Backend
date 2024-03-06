import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../application/userService'; 
import { Service } from 'typedi';

@Service()
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
}