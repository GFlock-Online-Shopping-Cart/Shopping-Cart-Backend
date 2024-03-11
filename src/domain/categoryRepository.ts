import { Category } from "./entities/category";

export interface ICategoryRepository {
    getCategoryById(categoryId: number): Promise<Category | undefined>
}