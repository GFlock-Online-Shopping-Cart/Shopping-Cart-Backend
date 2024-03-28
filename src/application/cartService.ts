import { Service } from "typedi"; 
import { Product } from "../domain/entities/product";
import { CartItem } from "../domain/entities/cartItem";
import { CartRepository } from "../infrastructure/repositories/cartRepository";

@Service()
export class CartService {
    constructor(private readonly cartRepository: CartRepository) {}

    async addToCartProduct(cartDetails: any, userId: string): Promise<CartItem> {
        return await this.cartRepository.addToCartProduct(cartDetails, userId);
    }

    async viewCart(userId: string): Promise<Product[]> {
        return await this.cartRepository.viewCart(userId);
    }

    async removeProductFromCart(userId: string, productId: number): Promise<string> {
        return await this.cartRepository.removeProductFromCart(userId, productId)
    }

    async updateCart(cartDetails: any, userId: string): Promise<CartItem> {
        return await this.cartRepository.modifyCart(cartDetails, userId)
    }
}