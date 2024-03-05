import { Service } from "typedi"; 
import { Product } from "../domain/entities/product"; 
import { ProductRepository } from "../infrastructure/repositories/productRepository";

@Service()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }

    async getProductById(productId: number): Promise<Product | undefined> {
        return await this.productRepository.getProductById(productId);
    }
}