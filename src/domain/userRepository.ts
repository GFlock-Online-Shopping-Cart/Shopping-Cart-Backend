import { User } from '../domain/entities/user';

export interface IUserRepository {
    getAllUsers() : Promise<User[]> ;
    getUserById(userId: number): Promise<User | undefined>;
    createUser(userDetails: any) : Promise<User>;
}
