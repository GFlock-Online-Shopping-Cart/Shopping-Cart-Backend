import { Service } from "typedi";
import { User } from "../domain/entities/user";
import { UserRepository } from "../infrastructure/repositories/userReporitory";

@Service()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(userDetails: any, userId: string): Promise<User> {
        try {
            return await this.userRepository.createUser(userDetails, userId);
        } catch (error) {
            throw error
        }
    }
}