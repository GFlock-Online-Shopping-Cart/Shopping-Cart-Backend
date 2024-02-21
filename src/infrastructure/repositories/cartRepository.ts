import { myDataSource } from "../../config/dataSource"; 
import { ICartRepository } from "../../domain/cartRepository"; 
import { Cart } from "../../domain/entities/cart";

export class CartRepository implements ICartRepository {
    async addToCartProduct(cartDetails: any): Promise<Cart> {
        const { userId } = cartDetails;

        const cartItem = new Cart();
        cartItem.user = userId;

        const result = await myDataSource.getRepository(Cart).save(cartItem);
        return result;
    }
}