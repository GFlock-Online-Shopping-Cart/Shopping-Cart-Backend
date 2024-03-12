import { Category } from "./entities/category";
import { Product } from "./entities/product";

export interface ICategoryRepository {
    getCategoryById(categoryId: number): Promise<Category | undefined>
    getAllCategories(): Promise<Category[]>
    getProductsByCategoryId(categoryId: number): Promise<Product[] | null>
}