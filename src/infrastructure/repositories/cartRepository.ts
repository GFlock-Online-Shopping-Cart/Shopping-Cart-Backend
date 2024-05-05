import { Service } from "typedi";
import { myDataSource } from "../../config/dataSource";
import { ICartRepository } from "../../domain/cartRepository";
import { CartItem } from "../../domain/entities/cartItem";
import { HTTPException } from "../../config/httpException";

@Service()
export class CartRepository implements ICartRepository {
  async addToCartProduct (productDetails: any, userId: string): Promise<CartItem> {
    const { productId, quantity } = productDetails;

    const cartItem = new CartItem();
    cartItem.userId = userId;
    cartItem.productId = productId;
    cartItem.quantity = quantity;

    const result = await myDataSource.getRepository(CartItem).save(cartItem);
    return result;
  }

  async viewCart(userId: string): Promise<CartItem[]> {
    const viewCartItems = await myDataSource.getRepository(CartItem).find({
      where: { userId },
      relations: {
        product: true,
      },
    });

    return viewCartItems;
  }

  async removeProductFromCart(userId: string, productId: number): Promise<string> {
    const cartRepository = myDataSource.getRepository(CartItem);

    const itemToRemove = await cartRepository.findOne({
      where: {
        userId,
        productId,
      },
    });
    if (!itemToRemove) {
      throw new HTTPException("Cart item not found in the cart", 404);
    } else {
      await cartRepository.delete(itemToRemove);
      return "Cart item removed successfully.";
    }
  }

  async modifyCart(cartDetails: any, userId: string): Promise<CartItem> {
    const { productId, quantity } = cartDetails;

    const cartItem = new CartItem();
    cartItem.userId = userId;
    cartItem.productId = productId;
    cartItem.quantity = quantity;

    const itemToUpdate = await myDataSource.getRepository(CartItem).findOneBy({
      userId,
      productId,
    });

    if (itemToUpdate) {
      myDataSource.getRepository(CartItem).merge(itemToUpdate, cartItem);
      const results = await myDataSource.getRepository(CartItem).save(cartItem);
      return results;
    } else {
      throw new HTTPException("Cart item not found", 404);
    }
  }

  async removeAllCartItems(userId: string): Promise<[]> {
    const cartRepository = myDataSource.getRepository(CartItem);
    await cartRepository.delete({
      userId,
    });
    return [];
  }
}
