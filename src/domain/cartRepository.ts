import { Product } from "./entities/product"; 
import { CartItem } from "./entities/cartItem"; 

export interface ICartRepository {
    addToCartProduct(productDetails: any): Promise<CartItem>;
    viewCart(cartId: number): Promise<Product[]>
    removeProductFromCart( cartId: number, productId: number): Promise<string>
    modifyCart( cartDetails: any ): Promise<CartItem>
}