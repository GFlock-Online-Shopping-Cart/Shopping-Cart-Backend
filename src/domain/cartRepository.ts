import { Cart } from "./entities/cart";  

export interface ICartRepository {
    addToCartProduct(cartDetails: any): Promise<Cart>;
}