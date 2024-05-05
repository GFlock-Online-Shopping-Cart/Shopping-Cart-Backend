import { NextFunction, Request, Response } from "express"; 
import { ProductService } from "../../application/productService"; 

export class ProductConstroller {
    constructor(private productService: ProductService) {}

    async onGetAllProducts(req: Request, res: Response, next: NextFunction) {
        const allProducts = await this.productService.getAllProducts()
        res.status(200).json({message: "success", data: allProducts})
    }

    async onGetProductBuId(req: Request, res: Response, next: NextFunction) {
        const productId = Number(req.params.productId);
        const product = await this.productService.getProductById(productId);
        res.status(200).json({message: "success", data: product})
    }
}