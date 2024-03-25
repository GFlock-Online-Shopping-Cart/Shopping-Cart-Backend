import { User } from '../domain/entities/user';

export interface IUserRepository {
    createUser(userDetails: any, userId: string) : Promise<User>;
}
