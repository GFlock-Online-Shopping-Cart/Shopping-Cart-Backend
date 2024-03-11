import { Service } from "typedi";
import { myDataSource } from "../../config/dataSource"; 
import { ICartRepository } from "../../domain/cartRepository"; 
import { CartItem } from "../../domain/entities/cartItem";
import { Product } from "../../domain/entities/product";
import { SubError } from "../../config/subError";

@Service()
export class CartRepository implements ICartRepository {
    async addToCartProduct(productDetails: any): Promise<CartItem> {
        const { productId, quantity, cartId } = productDetails;

        const cartItem = new CartItem();
        cartItem.cartId = cartId;
        cartItem.productId = productId;
        cartItem.quantity = quantity;

        const result = await myDataSource.getRepository(CartItem).save(cartItem);
        return result;
    }

    async viewCart(cartId: number): Promise<Product[]> {
        const viewCartItems = await myDataSource
        .createQueryBuilder(CartItem, "cart_item")
        .innerJoinAndSelect(Product, "product", "cart_item.productId = product.id")
        .where("cart_item.cartId = :cartId", {cartId})
        .select(["cart_item.cartId", "cart_item.productId", "cart_item.quantity", "product.productName", "product.productImage", "product.price"])
        .getRawMany();
    
        return viewCartItems;
    }

    async removeProductFromCart(cartId: number, productId:number): Promise<string> {
        
        const cartRepository = myDataSource.getRepository(CartItem);

        const itemToRemove = await cartRepository.findOne({
            where: {
                cartId,
                productId
            },
        });
        if (!itemToRemove) {
            throw new SubError('Product not found in cart', 404);
        } else {
            await cartRepository.delete(itemToRemove);
            return ("Cart item removed successfully.")
        }
    }

    async modifyCart(cartDetails: any): Promise<CartItem> {
        const { cartId, productId, quantity } = cartDetails 

        const cartItem = new CartItem();
        cartItem.cartId = cartId; 
        cartItem.productId = productId; 
        cartItem.quantity = quantity; 

        const itemToUpdate = await myDataSource.getRepository(CartItem).findOneBy({
            cartId, productId
        });

        if (itemToUpdate) {
            myDataSource.getRepository(CartItem).merge(itemToUpdate, cartItem);
            const results = await myDataSource.getRepository(CartItem).save(cartItem);
            return results;
        } else {
            throw new SubError("Cart item not found", 404);
        }

    }
}