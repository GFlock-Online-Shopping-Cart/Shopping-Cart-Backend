import { Checkout } from "./entities/checkout"

export interface ICheckoutRepository {
    createCheckout(checkout: Checkout): Promise<Checkout | string>
}