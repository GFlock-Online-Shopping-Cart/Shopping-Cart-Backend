import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"; 
import { Cart } from "./cart"; 
import { Product } from "./product"; 

@Entity()
export class CartItem {

    @PrimaryColumn()
    cartId: number;

    @PrimaryColumn()
    productId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart: Cart;
}