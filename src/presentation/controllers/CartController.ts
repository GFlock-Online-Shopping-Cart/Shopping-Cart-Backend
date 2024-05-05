import { Service } from "typedi"; 
import { Response, NextFunction } from "express"; 
import { CartService } from "../../application/cartService";
import { IRequest } from "../../interfaces/IRequest";

@Service()
export class CartController {
    constructor(private cartItemService: CartService) {}

    async onAddToCart(req: IRequest, res: Response, next: NextFunction) {
        const body = req.body;
        const userId = req.user?.id;

        try {
            if (userId) {
                const addedItem = await this.cartItemService.addToCartProduct(body, userId)
                res.status(200).json({message: "Item added successfully", data: addedItem});
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } catch(err) {
            res.status(500).json({message: "Internal server error"})
            next(err);
            
        }
    }

    async onViewCart(req: IRequest, res: Response, next: NextFunction) {
        const userId = req.user?.id
        
        try {
            if (userId) {
                const cart = await this.cartItemService.viewCart(userId);
                res.status(200).json({message: "Successfully view the cart", data: cart})
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } catch(err) {
            res.status(500).json({message: "Internal server error"})
            next(err)
        }
    }

    async onRemoveProductFromCart(req: IRequest, res: Response, next: NextFunction) {
        const productId = Number(req.params.productId);
        const userId = req.user?.id;
        try {
            if (userId) {
                const removedItem = await this.cartItemService.removeProductFromCart(userId, productId)
                res.status(200).json({message: "Successfully Removed", data: removedItem})
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } catch(err) {
            next(err);
        }
    }

    async onModifyCart(req: IRequest, res: Response, next: NextFunction) {
        const body = req.body;
        const productId = Number(req.body.productId)
        const userId = req.user?.id;

        try {
            if (userId) {
                const updatedItem = await this.cartItemService.updateCart(body, userId);
                res.status(200).json({message: "Cart is updated", data: updatedItem})
            } else if (!productId) {
                res.status(400).json({message: "Product item"})
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
            
        } catch(err) {
            next(err);
        }
    }
}