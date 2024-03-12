import { myDataSource } from "../../config/dataSource";
import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository";

jest.mock("../../config/dataSource");

describe("CategoryRepository", () => {
    let categoryRepository: CategoryRepository;

    beforeAll(() => {
        categoryRepository = new CategoryRepository();
    });

    describe("getCategoryById", () => {
        it("should return category by id", async() => {
            const categoryId = 5;
            const mockFindOneBy = jest.fn().mockResolvedValue({
                id: categoryId,
                categoryName: "T shirts"
            });
            myDataSource.getRepository = jest.fn().mockReturnValue({
                findOneBy: mockFindOneBy
            });

            const result = await categoryRepository.getCategoryById(categoryId);

            expect(myDataSource.getRepository).toHaveBeenCalledWith(Category);
            expect(mockFindOneBy).toHaveBeenCalledWith({id: categoryId});
            expect(result?.id).toBe(categoryId);
        });
    });

    it('should return undefined for non-existing category id', async() => {
        const nonExistingCategoryId = 500;
        const mockFindOneBy = jest.fn().mockResolvedValue(undefined);
        myDataSource.getRepository = jest
            .fn()
            .mockReturnValue({ findOneBy: mockFindOneBy });

            const result = await categoryRepository.getCategoryById(
                nonExistingCategoryId
            );

            expect(myDataSource.getRepository).toHaveBeenCalledWith(Category);
            expect(mockFindOneBy).toHaveBeenCalledWith({ id: nonExistingCategoryId });
            expect(result).toBeUndefined();
    })
})