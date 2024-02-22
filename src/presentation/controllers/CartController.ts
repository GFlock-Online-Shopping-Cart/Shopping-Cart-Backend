import { Request, Response, NextFunction } from "express"; 
import { CartService } from "../../application/cartService"; 

export class CartController {
    constructor(private cartItemService: CartService) {}

    async onAddToCart(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        try {
            const addedItem = await this.cartItemService.addToCartProduct(body)
            res.status(200).json({message: "Item added successfully", data: addedItem});
        } catch(err) {
            next(err);
        }
    }

    async onViewCart(req: Request, res: Response, next: NextFunction) {
        const cartId = Number(req.params.cartId);
        const cart = await this.cartItemService.viewCart(cartId);
        res.status(200).json({message: "success", data: cart})
    }
}