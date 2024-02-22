import { Cart } from "../domain/entities/cart"; 
import { Service } from "typedi"; 
import { ICartRepository } from "../domain/cartRepository";
import { Product } from "../domain/entities/product";

@Service()
export class CartService {
    constructor(private readonly cartRepository: ICartRepository) {}

    async addToCartProduct(cartDetails: any): Promise<Cart> {
        return await this.cartRepository.addToCartProduct(cartDetails);
    }

    async viewCart(cartId: number): Promise<Product[]> {
        return await this.cartRepository.viewCart(cartId);
    }
}