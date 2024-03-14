import Container from "typedi";
import express, { Router, Request, Response } from "express"; 
import { CartController } from "../controllers/CartController"; 

import { checkJwt } from "../middleware/auth.middleware";

const router = Router();

const cartController = Container.get(CartController)

router.use(checkJwt);
router.post("/add-to-cart", cartController.onAddToCart.bind(cartController));
router.get("/view-cart/:cartId", cartController.onViewCart.bind(cartController));
router.delete("/remove-product/:cartId/:productId", cartController.onRemoveProductFromCart.bind(cartController));
router.put("/modify-cart", cartController.onModifyCart.bind(cartController));
export default router;