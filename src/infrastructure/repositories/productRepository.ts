import { myDataSource } from "../../config/dataSource"; 
import { Product } from "../../domain/entities/product"; 
import { IProductRepository } from "../../domain/productRepository"; 

export class ProductRepository implements IProductRepository {
    async getAllProducts(): Promise<Product[]> {
        const allProducrs = await myDataSource.getRepository(Product).find()
        return allProducrs;
    }
}