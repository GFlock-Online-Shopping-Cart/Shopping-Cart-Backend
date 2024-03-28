import { Service } from "typedi";
import { Response, NextFunction } from "express";
import { CheckoutService } from "../../application/checkoutService";
import { IRequest } from "../../interfaces/IRequest";

@Service()
export class CheckoutController {
    constructor(private checkoutService: CheckoutService) {}

    async onCreateCheckout(req: IRequest, res: Response, next: NextFunction) {
        const userId = req.user?.id;
        try {
            if (userId) {
                const createCheckout = await this.checkoutService.ceateCheckout(userId)
                res.status(200).json({ message: "Checkout created successfully", data: createCheckout })
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } catch (err) {
            next(err);
        }
    }
}