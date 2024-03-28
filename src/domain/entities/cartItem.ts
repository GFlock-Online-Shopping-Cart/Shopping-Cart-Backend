import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";  
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class CartItem {

    @PrimaryColumn({type: "varchar"})
    userId: string;

    @PrimaryColumn()
    productId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product) => product.cartItems)
    product: Product

    @ManyToOne(() => User, (user) => user.cartItems)
    user: User
}