import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"; 

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Index({ unique: true })
    @Column()
    emailAddress: string;

    @Column()
    mobileNumber: string;

    @Column()
    streetAddress: string;

    @Column()
    city: string;

    @Column()
    province: string;

    // constructor(
    //     userId: number,
    //     firstName: string,
    //     lastName: string,
    //     emailAddress: string,
    //     mobileNumber: string,
    //     streetAddress: string,
    //     city: string,
    //     province: string,
    //     password: string,
    //     ) {
    //         this.userId = userId;
    //         this.firstName = firstName;
    //         this.lastName = lastName;
    //         this.emailAddress = emailAddress;
    //         this.mobileNumber = mobileNumber;
    //         this.streetAddress = streetAddress;
    //         this.city = city;
    //         this.province = province;
    //         this.password = password;
    //     }
}