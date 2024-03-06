import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm"; 
import { Checkout } from "./checkout";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
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

    @OneToMany(() => Checkout, (checkout) => checkout.users)
    checkouts: Checkout[]

}