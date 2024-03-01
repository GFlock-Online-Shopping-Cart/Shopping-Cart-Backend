import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"; 
import { Cart } from "./cart"; 

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