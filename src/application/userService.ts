import { User } from "../domain/entities/user";
import { Service } from "typedi";
import { UserRepository } from "../infrastructure/repositories/userReporitory";

@Service()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(userId: number): Promise<User | undefined> {
        return await this.userRepository.getUserById(userId);
    }
}