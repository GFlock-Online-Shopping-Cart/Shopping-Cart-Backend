import { Service } from "typedi";
import { Response, NextFunction } from "express";
import { CheckoutService } from "../../application/checkoutService";
import { IRequest } from "../../interfaces/IRequest";

@Service()
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  async onCreateCheckout(req: IRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    
    try {
      if (userId && userEmail) {
        const createCheckout = await this.checkoutService.ceateCheckout(userId, userEmail);
        res.status(200).json({ message: "Success", data: createCheckout });
      } 
    } catch (err) {
      next(err);
    }
  }

  async onGetCheckoutById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const checkoutId = Number(req.params.checkoutId);
      const checkout = await this.checkoutService.getCheckoutById(checkoutId);

      if (!checkout) {
        res.status(404).json({ message: "The checkout is not found" });
      } else {
        res.status(200).json({ message: "Success", data: checkout });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async onViewOrderHistory(req: IRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;

    try {
      if (userId) {
        const allCheckouts = await this.checkoutService.viewOrderHistory(
          userId
        );
        res.status(200).json({ message: "Success", data: allCheckouts });
      } 
    } catch (err) {
      next(err);
    }
  }
}
