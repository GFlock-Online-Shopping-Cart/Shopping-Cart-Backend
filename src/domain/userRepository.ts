import { User } from '../domain/entities/user';

export interface IUserRepository {
    getAllUsers() : Promise<User[]> ;
    getUserById(userId: string): Promise<User | undefined>;
    createUser(userDetails: any) : Promise<User>;
}
