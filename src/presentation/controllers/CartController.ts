import { Service } from "typedi"; 
import { Request, Response, NextFunction } from "express"; 
import { CartService } from "../../application/cartService";

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

    async onModifyCart(req: Request, res: Response, next: NextFunction) {
        const body = req.body;
        const productId = Number(req.body.productId)
        const cartId = Number(req.body.cartId)

        try {
            if (!productId || !cartId) {
                res.status(400).json({message: "Product item or cart not found"})
            }
            const updatedItem = await this.cartItemService.updateCart(body);
            res.status(200).json({message: "Cart is updated", data: updatedItem})
        } catch(err: any) {
            console.log(err.message);
            
            res.status(500).json({message: "Internal server error"})
        }
    }
}