import { Service } from "typedi";
import { myDataSource } from "../../config/dataSource";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/userRepository";

@Service()
export class UserRepository implements IUserRepository {

    async createProfile(userDetails: any, userId: string): Promise<User> { 
        const { firstName, lastName, mobileNumber, streetAddress, city, province } = userDetails;
        
        const newUser = new User();
        newUser.id = userId;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.mobileNumber = mobileNumber;
        newUser.streetAddress = streetAddress;
        newUser.city = city;
        newUser.province = province;

    
        const result = await myDataSource.getRepository(User).save(newUser);  //save method returns an instance of newUser object.
        return result;
    }
}
