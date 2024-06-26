import { User } from '../domain/entities/user';

export interface IUserRepository {
    createProfile(userDetails: any, userId: string) : Promise<User>;
    getProfileByUserId(userId: string): Promise<User | undefined>;
}
