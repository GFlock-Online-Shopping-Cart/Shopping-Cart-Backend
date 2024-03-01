import { myDataSource } from "../../config/dataSource"; 
import { Product } from "../../domain/entities/product"; 
import { IProductRepository } from "../../domain/productRepository"; 

export class ProductRepository implements IProductRepository {
    // static getAllProducts() {
    //     throw new Error("Method not implemented.");
    // }
    async getAllProducts(): Promise<Product[]> {
        const allProducrs = await myDataSource.getRepository(Product).find()
        return allProducrs;
    }

    async getProductById(productId: number): Promise<Product | undefined> {
        const product = await myDataSource.getRepository(Product).findOneBy({
            id: productId
        })
        return product ? product : undefined;
    }
}