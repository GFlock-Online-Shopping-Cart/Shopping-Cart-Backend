import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../application/authService";


export class AuthController {
    constructor(private authService: AuthService) {}

    async onSignUp(req: Request, res: Response, next: NextFunction) {
        const body = req.body;
        
        try {
            const createdUser = await this.authService.createUser(body)
            res.status(200).json({message: "User created successfully", data: createdUser});
            
            
        } catch(err) {
            next(err);
        }
        
        
        
        
        // validate inputs
    }
}