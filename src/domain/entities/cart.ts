import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne, 
    OneToMany,
    JoinColumn 
} from "typeorm"; 

import { User } from "./user";
import { CartItem } from "./cartItem";
// import { ProductToCart } from "./productsToCart";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)

    @JoinColumn()
    user: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItems: CartItem[]

}