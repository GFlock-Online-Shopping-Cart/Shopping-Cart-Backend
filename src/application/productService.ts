import { IProductRepository } from "../domain/productRepository"; 
import { Product } from "../domain/entities/product"; 
import { Service } from "typedi"; 

@Service()
export class ProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }
}