import { myDataSource } from "../../config/dataSource";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/userRepository";


export class UserRepository implements IUserRepository {
    async getAllUsers(): Promise<User[]> {
        const allUsers = await myDataSource.getRepository(User).find()
        return allUsers;
    }

    async getUserById(userId: number): Promise<User | undefined> {
        const user = await myDataSource.getRepository(User).findOneBy({
            id: userId
        })
        return user ? user : undefined;
    }

    async createUser(userDetails: any): Promise<User> {
        const {firstName, lastName, emailAddress, mobileNumber, streetAddress, city, province} = userDetails;
        
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.emailAddress = emailAddress;
        newUser.mobileNumber = mobileNumber;
        newUser.streetAddress = streetAddress;
        newUser.city = city;
        newUser.province = province;

    
        const result = await myDataSource.getRepository(User).save(newUser);  //save method returns an instance of newUser object.
        return result;
    }

}
