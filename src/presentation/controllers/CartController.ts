import { Request, Response, NextFunction } from "express"; 
import { CartService } from "../../application/cartService"; 

export class CartController {
    constructor(private cartService: CartService) {}

    async onAddToCart(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        try {
            const addedItem = await this.cartService.addToCartProduct(body)
            res.status(200).json({message: "Item added successfully", data: addedItem});
        } catch(err) {
            next(err);
        }
    }
}