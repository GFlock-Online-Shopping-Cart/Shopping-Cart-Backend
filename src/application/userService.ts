import { Service } from "typedi";
import { User } from "../domain/entities/user";
import { UserRepository } from "../infrastructure/repositories/userReporitory";

@Service()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(userId: string): Promise<User | undefined> {
        return await this.userRepository.getUserById(userId);
    }
}