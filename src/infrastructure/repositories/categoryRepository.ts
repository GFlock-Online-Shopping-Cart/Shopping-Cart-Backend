import { Service } from "typedi";
import { myDataSource } from "../../config/dataSource";
import { ICategoryRepository } from "../../domain/categoryRepository";
import { Category } from "../../domain/entities/category";

@Service()
export class CategoryRepository implements ICategoryRepository {
    async getCategoryById(categoryId: number): Promise<Category | undefined> {
        const category = await myDataSource.getRepository(Category).findOneBy({
            id: categoryId
        })       
        return category ?? undefined
    }

    async getAllCategories(): Promise<Category[]> {
        const allCategories = await myDataSource.getRepository(Category).find()
        return allCategories;   
    }
}