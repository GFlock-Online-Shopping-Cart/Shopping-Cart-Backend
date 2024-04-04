import Container from "typedi";
import { Router } from "express";
import { validateAccessToken, decodeAccessToken, decodedIdToken } from "../middleware/auth.middleware";
import { CheckoutController } from "../controllers/CheckoutController";

const email = require('../../infrastructure/externalServices/emailService');
const router = Router();
const checkoutController = Container.get(CheckoutController)

router.post("/createCheckout",validateAccessToken, decodeAccessToken, decodedIdToken, checkoutController.onCreateCheckout.bind(checkoutController));
router.get("/getCheckoutById/:checkoutId", validateAccessToken, decodeAccessToken, checkoutController.onGetCheckoutById.bind(checkoutController));
router.get("/viewOrderHistory", validateAccessToken, decodeAccessToken, checkoutController.onViewOrderHistory.bind(checkoutController));

export default router;