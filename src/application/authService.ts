import { Service } from "typedi"; 
import { User } from "../domain/entities/user"; 
import { UserRepository } from "../infrastructure/repositories/userReporitory";

@Service()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository, 
    ) {}
    async createUser(userDetails: any): Promise<User> {
        try {
            return await this.userRepository.createUser(userDetails);
        } catch (error) {
            throw error
        }
    }
}