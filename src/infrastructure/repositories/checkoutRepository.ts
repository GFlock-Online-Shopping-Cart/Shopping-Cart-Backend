import { Service } from "typedi";
import { myDataSource } from "../../config/dataSource";
import { ICheckoutRepository } from "../../domain/checkoutRepository";
import { Checkout } from "../../domain/entities/checkout";

@Service()
export class CheckoutRepository implements ICheckoutRepository {
    async createCheckout(checkout: Checkout): Promise<Checkout | string> {
        return myDataSource.manager.save(checkout);
    }
}