import Container from "typedi";
import { Router } from "express";
import { CheckoutController } from "../controllers/CheckoutController";

const router = Router();
const checkoutController = Container.get(CheckoutController)

router.post("/create-checkout", checkoutController.onCreateCheckout.bind(checkoutController));
router.get("/get-checkout-by-id/:checkoutId", checkoutController.onGetCheckoutById.bind(checkoutController));
export default router;