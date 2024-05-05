import { Request, NextFunction, Response } from 'express';
import { UserService } from '../../application/userService'; 
import { Service } from 'typedi';
import { IRequest } from '../../interfaces/IRequest';

@Service()
export class UserController {
    constructor(private userService: UserService) {}

    async onCreateProfile(req: IRequest, res: Response, next: NextFunction) {
        const body = req.body;
        const userId = req.user?.id;
    
        try {
            if (userId) {
                const createdUser = await this.userService.createProfile(body, userId);
                res.status(200).json({ message: "Profile created successfully", data: createdUser });
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } catch (err: any) {
          next(err);
        }
        // validate inputs
      }

      async onGetProfileById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const profile = await this.userService.getUserById(userId);
        res.status(200).json({message: "success", data: profile});
      }
}