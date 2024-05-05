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

        try {
            await myDataSource.getRepository(Category).findOneOrFail({
                where: {
                    id: categoryId
                }
            });
            const categoryProducts = await myDataSource
            .createQueryBuilder(Category, "category")
            .innerJoinAndSelect(Product, "product", "category.id = product.categoriesId")
            .where("category.id = :categoryId", {categoryId})
            .select(["category.id", "category.categoryName", "product.id", "product.productName", "product.productImage", "product.description", "product.price"])
            .getRawMany();
            return categoryProducts;
        } catch (error) {
            throw new HTTPException('Category is not found', 404)
        }  
    }
}