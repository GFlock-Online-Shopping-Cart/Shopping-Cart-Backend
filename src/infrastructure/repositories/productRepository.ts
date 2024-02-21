import { myDataSource } from "../../config/dataSource"; 
import { Product } from "../../domain/entities/product"; 
import { IProductRepository } from "../../domain/productRepository"; 

export class ProductRepository implements IProductRepository {
    async getAllProducts(): Promise<Product[]> {
        const allProducts = await myDataSource.getRepository(Product).find()
        return allProducts;
    }

    async getProductById(productId: number): Promise<Product | undefined> {
        const product = await myDataSource.getRepository(Product).findOneBy({
            id: productId
        })
        return product ? product : undefined;
    }
}