import { Cart } from "../domain/entities/cart"; 
import { Service } from "typedi"; 
import { ICartRepository } from "../domain/cartRepository";

@Service()
export class CartService {
    constructor(private readonly cartRepository: ICartRepository) {}

    async addToCartProduct(cartDetails: any): Promise<Cart> {
        return await this.cartRepository.addToCartProduct(cartDetails);
    }
}