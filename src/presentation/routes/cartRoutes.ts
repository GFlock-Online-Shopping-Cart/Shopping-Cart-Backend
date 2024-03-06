import Container from "typedi";
import { Router } from "express"; 
import { CartController } from "../controllers/CartController"; 

const router = Router();

const cartController = Container.get(CartController)

router.post("/add-to-cart", cartController.onAddToCart.bind(cartController));
router.get("/view-cart/:cartId", cartController.onViewCart.bind(cartController));
router.delete("/remove-product/:cartId/:productId", cartController.onRemoveProductFromCart.bind(cartController))
export default router;