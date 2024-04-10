import Container from "typedi";
import { Router } from "express"; 
import { CartController } from "../controllers/CartController";
import { ValidationMiddleware } from "../middleware/validation.middleware"; 
import { CartItemtDTO } from "../dto/cart.dto";


const router = Router();

const cartController = Container.get(CartController)


router.post("/add-to-cart", ValidationMiddleware(CartItemtDTO), cartController.onAddToCart.bind(cartController));
router.get("/view-cart", cartController.onViewCart.bind(cartController));
router.delete("/remove-product/:productId", cartController.onRemoveProductFromCart.bind(cartController));
router.put("/modify-cart", ValidationMiddleware(CartItemtDTO), cartController.onModifyCart.bind(cartController));
export default router;