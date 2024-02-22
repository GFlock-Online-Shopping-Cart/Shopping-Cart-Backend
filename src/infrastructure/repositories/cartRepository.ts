import { myDataSource } from "../../config/dataSource"; 
import { ICartRepository } from "../../domain/cartRepository"; 
import { Cart } from "../../domain/entities/cart";
import { CartItem } from "../../domain/entities/cartItem";
import { Product } from "../../domain/entities/product";

export class CartRepository implements ICartRepository {
    async addToCartProduct(cartDetails: any): Promise<Cart> {
        const { userId } = cartDetails;

        const cartItem = new Cart();
        cartItem.user = userId;

        const result = await myDataSource.getRepository(Cart).save(cartItem);
        return result;
    }

    async viewCart(cartId: number): Promise<Product[]> {
        const viewCartitems = await myDataSource
        .createQueryBuilder(CartItem, "cart_item")
        .innerJoinAndSelect(Product, "product", "cart_item.productId = product.id")
        .where("cart_item.cartId = :cartId", {cartId})
        .select(["cart_item.cartId", "cart_item.productId", "cart_item.quantity", "product.productName", "product.productImage", "product.price"])
        .getRawMany();
    
        return viewCartitems;
    }
}