import { Entity, PrimaryColumn, Column, Index, OneToMany } from "typeorm"; 
import { Checkout } from "./checkout";
import { CartItem } from "./cartItem";

@Entity()
export class User {
    @PrimaryColumn({type: "varchar"})
    id: string;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    mobileNumber: string;

    @Column()
    streetAddress: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @OneToMany(() => Checkout, (checkout) => checkout.user)
    checkouts: Checkout[]

    @OneToMany(() => CartItem, (cartItem) => cartItem.user)
    cartItems: CartItem[]

}