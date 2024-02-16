import { IUserRepository } from "../domain/userRepository"; 
import { User } from "../domain/entities/user"; 
import { Service } from "typedi"; 

@Service()
export class AuthService {
    constructor(private readonly userRepository: IUserRepository) {}

    async createUser(userDetails: any): Promise<User> {
        return await this.userRepository.createUser(userDetails);
    }
}