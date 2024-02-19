import { Product } from "./entities/product"; 

export interface IProductRepository {
    getAllProducts(): Promise<Product[]>;
    getProductById(productId: number): Promise<Product | undefined>;
}