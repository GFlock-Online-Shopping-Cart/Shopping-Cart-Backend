import { CategoryService } from "../../application/categoryService";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository";

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let mockCategoryRepository: CategoryRepository;

    beforeAll(() => {
        mockCategoryRepository = {
            getCategoryById: jest.fn()
        } as unknown as CategoryRepository;

        categoryService = new CategoryService(mockCategoryRepository);
    });

    describe('getCategoryById', () => {
        it('should return category by id', async() => {
            const categoryId = 4;
            (mockCategoryRepository.getCategoryById as jest.Mock).mockResolvedValue({
                "id": categoryId,
                "categoryName": "Shirts"
            })

            const result = await categoryService.getCategoryById(categoryId)

            expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(result?.id).toBe(categoryId);
        })
    })
})