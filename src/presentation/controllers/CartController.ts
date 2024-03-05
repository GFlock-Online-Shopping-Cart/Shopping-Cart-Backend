import { Request, Response, NextFunction } from "express"; 
import { CartService } from "../../application/cartService";
import { Service } from "typedi"; 

@Service()
export class CartController {
    constructor(private cartItemService: CartService) {}

    async onAddToCart(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        try {
            const addedItem = await this.cartItemService.addToCartProduct(body)
            res.status(200).json({message: "Item added successfully", data: addedItem});
        } catch(err) {
            res.status(500).json({message: "Internal server error"})
            next(err);
            
        }
    }

    async onViewCart(req: Request, res: Response, next: NextFunction) {
        const cartId = Number(req.params.cartId);
        const cart = await this.cartItemService.viewCart(cartId);

        try {
            res.status(200).json({message: "Successfully view the cart", data: cart})
        } catch(err) {
            res.status(500).json({message: "Internal server error"})
            next(err)
        }
    }

    async onRemoveProductFromCart(req: Request, res: Response, next: NextFunction) {
        const productId = Number(req.params.productId);
        const cartId = Number(req.params.cartId)
        const removedItem = await this.cartItemService.removeProductFromCart(cartId, productId)
        try {
            res.status(200).json({message: "Successfully Removed", data: removedItem})
        } catch(err) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}