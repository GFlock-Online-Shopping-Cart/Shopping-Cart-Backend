import { NextFunction, Request, Response } from "express"; 
import { ProductService } from "../../application/productService"; 
import { Service } from "typedi";

@Service()
export class ProductController {
    constructor(private productService: ProductService) {}

    async onGetAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(this.productService);
            const allProducts = await this.productService.getAllProducts()
            res.status(200).json({message: "success", data: allProducts})
        } catch(err) {
            console.error("Error in onGetAllProducts:", err);
            
            res.status(500).json({message: "Internal server error"})
            next(err);
        }
    }

    async onGetProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = Number(req.params.productId);
            const product = await this.productService.getProductById(productId);
            if (!product) {
                res.status(404).json({message: "The product is not found"})
            } else {  
                res.status(200).json({message: "Success", data: product})
            }
        } catch(err) {
            res.status(500).json({ message: "Internal server error" })
            next(err);
        }
    }
}