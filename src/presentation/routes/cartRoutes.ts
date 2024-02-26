import { Request, Response, NextFunction, Router } from "express"; 
import { CartController } from "../controllers/CartController"; 
import { CartRepository } from "../../infrastructure/repositories/cartRepository"; 
import { CartService } from "../../application/cartService"; 

const router = Router();

const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

router.post("/add-to-cart", cartController.onAddToCart.bind(cartController));
router.get("/view-cart/:cartId", cartController.onViewCart.bind(cartController));
router.delete("/remove-product/:productId", cartController.onRemoveProductFromCart.bind(cartController))
export default router;