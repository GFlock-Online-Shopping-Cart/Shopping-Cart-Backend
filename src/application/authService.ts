import { User } from "../domain/entities/user"; 
import { Service } from "typedi"; 
import { UserRepository } from "../infrastructure/repositories/userReporitory";

@Service()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(userDetails: any): Promise<User> {
        return await this.userRepository.createUser(userDetails);
    }
}