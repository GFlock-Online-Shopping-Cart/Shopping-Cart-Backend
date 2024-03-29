import { Service } from "typedi";
import { myDataSource } from "../../config/dataSource";
import { ICheckoutRepository } from "../../domain/checkoutRepository";
import { Checkout } from "../../domain/entities/checkout";
import { CheckoutItem } from "../../domain/entities/checkoutItem";

@Service()
export class CheckoutRepository implements ICheckoutRepository {
  async createCheckout(checkout: Checkout): Promise<Checkout | string> {
    return myDataSource.manager.save(checkout);
  }

  async getCheckoutById(checkoutId: number): Promise<Checkout | undefined> {
    const checkoutItems = await myDataSource
      .createQueryBuilder(Checkout, "checkout")
      .leftJoinAndSelect("checkout.checkoutItems", "checkout_item")
      .where("checkout.id = :checkoutId", { checkoutId })
      .getOne();

    return checkoutItems ?? undefined;
  }

  async getAllCheckoutsByUserId(userId: string): Promise<Checkout[] | undefined> {
    const checkouts = await myDataSource
    .createQueryBuilder()
    .select(["c.id", "c.checkoutDate", "c.checkoutPrice", "ci.productId", "ci.price", "ci.quantity"])
    .from("checkout", "c")
    .innerJoin("checkout_item", "ci", "ci.checkoutId = c.id")
    .where("c.userId = :userId", {userId: userId})
    .getRawMany();

    return checkouts ?? undefined;
  }
}
