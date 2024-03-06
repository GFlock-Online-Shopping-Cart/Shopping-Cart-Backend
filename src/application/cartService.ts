import { Service } from "typedi"; 
import { Product } from "../domain/entities/product";
import { CartItem } from "../domain/entities/cartItem";
import { CartRepository } from "../infrastructure/repositories/cartRepository";

@Service()
export class CartService {
    constructor(private readonly cartRepository: CartRepository) {}

    async addToCartProduct(cartDetails: any): Promise<CartItem> {
        return await this.cartRepository.addToCartProduct(cartDetails);
    }

    async viewCart(cartId: number): Promise<Product[]> {
        return await this.cartRepository.viewCart(cartId);
    }

    async removeProductFromCart(cartId: number, productId: number): Promise<string> {
        return await this.cartRepository.removeProductFromCart(cartId, productId)
    }
}