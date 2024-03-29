import { Service } from "typedi";
import { CheckoutRepository } from "../infrastructure/repositories/checkoutRepository";
import { CartRepository } from "../infrastructure/repositories/cartRepository";
import { Checkout } from "../domain/entities/checkout";

@Service()
export class CheckoutService {
  constructor(
    private readonly checkoutRepository: CheckoutRepository,
    private readonly cartRepository: CartRepository
  ) {}

  async ceateCheckout(userId: string): Promise<Checkout | string> {
      const cartItems = await this.cartRepository.viewCart(userId);

      const checkoutItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      }));

      let checkoutPrice = 0;
      for(const checkoutItem of checkoutItems) {
        checkoutPrice += checkoutItem.price * checkoutItem.quantity
      }
      const newCheckout = new Checkout();
      newCheckout.checkoutItems = checkoutItems as any;
      newCheckout.checkoutPrice = checkoutPrice;
      newCheckout.userId = userId;

      if (checkoutItems.length > 0) {

        const checkout = await this.checkoutRepository.createCheckout(
          newCheckout
          );

          // remove all cart items
          await this.cartRepository.removeAllCartItems(userId)
          return checkout;
      }

      return "Cannot create checkout because cart is empty";
  }
}
