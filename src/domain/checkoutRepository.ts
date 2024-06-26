import { Checkout } from "./entities/checkout"

export interface ICheckoutRepository {
    createCheckout(checkout: Checkout): Promise<Checkout | string>
    getCheckoutById(checkoutId: number): Promise<Checkout | undefined>
    viewOrderHistory(userId: string): Promise<Checkout[] | undefined>
}