import { IUserRepository } from "../domain/userRepository"; 
import { User } from "../domain/entities/user";
import { Service } from "typedi";

@Service()
export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(userId: number): Promise<User | undefined> {
        return await this.userRepository.getUserById(userId);
    }
}