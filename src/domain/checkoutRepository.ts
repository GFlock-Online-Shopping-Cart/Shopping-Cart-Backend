import { Checkout } from "./entities/checkout"

export interface ICheckoutRepository {
    createCheckout(checkout: Checkout): Promise<Checkout | string>
    getCheckoutById(checkoutId: number): Promise<Checkout | undefined>
    getAllCheckoutsByUserId(userId: string): Promise<Checkout[] | undefined>
}