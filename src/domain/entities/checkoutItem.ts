// import { Entity, PrimaryColumn, ManyToOne } from "typeorm"; 
// import { CartItem } from "./cartItem";
// import { Checkout } from "./checkout";

// @Entity()
// export class CheckoutItem {

//     @PrimaryColumn()
//     cartItemId: number;

//     @PrimaryColumn()
//     checkoutId: number;

//     @ManyToOne(() => CartItem, (cartItem) => cartItem.checkoutItems)
//     cartItem: CartItem;

//     @ManyToOne(() => Checkout,  (checkout) => checkout.checkoutItems)
//     checkout: Checkout;
// }