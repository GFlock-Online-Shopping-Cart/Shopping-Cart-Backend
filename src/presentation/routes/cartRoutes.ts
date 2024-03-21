import Container from "typedi";
import { Router } from "express"; 
import { CartController } from "../controllers/CartController"; 
import { validateAccessToken } from "../middleware/auth.middleware";


const router = Router();

const cartController = Container.get(CartController)


router.post("/add-to-cart", validateAccessToken, cartController.onAddToCart.bind(cartController));
router.get("/view-cart/:cartId", validateAccessToken,  cartController.onViewCart.bind(cartController));
router.delete("/remove-product/:cartId/:productId", validateAccessToken, cartController.onRemoveProductFromCart.bind(cartController));
router.put("/modify-cart", validateAccessToken, cartController.onModifyCart.bind(cartController));
export default router;