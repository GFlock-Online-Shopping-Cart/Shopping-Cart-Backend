import { Service } from "typedi"; 
import { ICartRepository } from "../domain/cartRepository";
import { Product } from "../domain/entities/product";
import { CartItem } from "../domain/entities/cartItem";

@Service()
export class CartService {
    constructor(private readonly cartRepository: ICartRepository) {}

    async addToCartProduct(cartDetails: any): Promise<CartItem> {
        return await this.cartRepository.addToCartProduct(cartDetails);
    }

    async viewCart(cartId: number): Promise<Product[]> {
        return await this.cartRepository.viewCart(cartId);
    }

    async removeProductFromCart(productId: number): Promise<CartItem[]> {
        return await this.cartRepository.removeProductFromCart(productId)
    }
}