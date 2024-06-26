import { Service } from "typedi";
import { CheckoutRepository } from "../infrastructure/repositories/checkoutRepository";
import { CartRepository } from "../infrastructure/repositories/cartRepository";
import { Checkout } from "../domain/entities/checkout";
import { EmailService } from "../infrastructure/externalServices/BrevoEmailService/emailService";
import { EmailContentGenerator } from "../infrastructure/externalServices/BrevoEmailService/emailContent";

@Service()
export class CheckoutService {
  constructor(
    private readonly checkoutRepository: CheckoutRepository,
    private readonly cartRepository: CartRepository,
    private readonly emailService: EmailService
  ) {}

  async ceateCheckout(userId: string, userEmail: string): Promise<Checkout | string> {
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

      const checkoutEmail = new EmailContentGenerator();
      const emailContent = checkoutEmail.generateCheckoutEmailContent(newCheckout);
      
      if (checkoutItems.length > 0) {

        const checkout = await this.checkoutRepository.createCheckout(
          newCheckout
          );

          await this.emailService.sendEmail(
            userEmail,
            4,
            emailContent
          )

          // remove all cart items
          await this.cartRepository.removeAllCartItems(userId)
          return checkout;
      } else {
          return "Cannot create checkout because cart is empty";
      }

  }

  async getCheckoutById(checkoutId: number): Promise<Checkout | undefined> {
    return await this.checkoutRepository.getCheckoutById(checkoutId);
  }

  async viewOrderHistory(userId: string): Promise<Checkout[] | undefined> {
    return await this.checkoutRepository.viewOrderHistory(userId);
  }
}
