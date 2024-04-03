import Container from "typedi";
import { Request, Response, NextFunction, Router } from "express";
import { CheckoutController } from "../controllers/CheckoutController";

const email = require('../../infrastructure/externalServices/emailService');
const router = Router();
const checkoutController = Container.get(CheckoutController)

router.post("/createCheckout", checkoutController.onCreateCheckout.bind(checkoutController));
router.get("/getCheckoutById/:checkoutId", checkoutController.onGetCheckoutById.bind(checkoutController));
router.get("/viewOrderHistory", checkoutController.onViewOrderHistory.bind(checkoutController));

export default router;