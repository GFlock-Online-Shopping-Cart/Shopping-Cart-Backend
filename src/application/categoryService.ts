import { Service } from "typedi";
import { Category } from "../domain/entities/category";
import { CategoryRepository } from "../infrastructure/repositories/categoryRepository";

@Service()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getCategoryById(categoryId: number): Promise<Category | undefined> {
        return await this.categoryRepository.getCategoryById(categoryId);
    }

    async getAllCategories(): Promise<Category[]>{
        return await this.categoryRepository.getAllCategories();
    }
}