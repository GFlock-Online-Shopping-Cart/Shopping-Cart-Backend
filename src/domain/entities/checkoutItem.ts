import { Entity, Column, ManyToOne, PrimaryColumn, Decimal128 } from "typeorm";
import { Product } from "./product";
import { Checkout } from "./checkout";

@Entity()
export class CheckoutItem {
    @PrimaryColumn()
    productId: number

    @PrimaryColumn()
    checkoutId: number

    @Column("decimal")
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product) => product.checkoutItems)
    product: Product

    @ManyToOne(() => Checkout, (checkout) => checkout.checkoutItems)
    checkout: Checkout

}