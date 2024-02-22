import { Cart } from "./entities/cart"; 
import { Product } from "./entities/product"; 

export interface ICartRepository {
    addToCartProduct(cartDetails: any): Promise<Cart>;
    viewCart(cartId: number): Promise<Product[]>
}