import { Service } from "typedi";
import { myDataSource } from "../../config/dataSource";
import { ICategoryRepository } from "../../domain/categoryRepository";
import { Category } from "../../domain/entities/category";
import { Product } from "../../domain/entities/product";
import { HTTPException } from "../../config/httpException";

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

    async getProductsByCategoryId(categoryId: number): Promise<Product[] | null> {

        const category = await myDataSource.getRepository(Category).findOneBy({
            id: categoryId
        });
        
        if(!category) {
            throw new HTTPException('Category is not found', 404);
        } 
        const categoryProducts = await myDataSource
        .createQueryBuilder(Category, "category")
        .innerJoinAndSelect(Product, "product", "category.id = product.categoriesId")
        .where("category.id = :categoryId", {categoryId})
        .select(["category.id", "category.categoryName", "product.productName"])
        .getRawMany();

        return categoryProducts;
        
    }
}