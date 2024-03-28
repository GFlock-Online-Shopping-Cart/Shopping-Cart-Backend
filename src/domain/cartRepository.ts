import { Product } from "./entities/product"; 
import { CartItem } from "./entities/cartItem"; 

export interface ICartRepository {
    addToCartProduct(productDetails: any, userId: string): Promise<CartItem>;
    viewCart(userId: string): Promise<Product[]>
    removeProductFromCart( userId: string, productId: number): Promise<string>
    modifyCart( cartDetails: any, userId: string ): Promise<CartItem>
}