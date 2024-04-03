import { Service } from "typedi";
import { Response, NextFunction } from "express";
import { CheckoutService } from "../../application/checkoutService";
import { IRequest } from "../../interfaces/IRequest";

@Service()
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  async onCreateCheckout(req: IRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    const user = req.body;
    const userEmail = user.email;

    console.log("user email", userEmail);
    
    try {
      if (userId) {
        const createCheckout = await this.checkoutService.ceateCheckout(userId, userEmail);
        res.status(200).json({ message: "Success", data: createCheckout });
      } else {
        res.status(401).json({ message: "Unauthorized" });
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
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      next(err);
    }
  }
}
