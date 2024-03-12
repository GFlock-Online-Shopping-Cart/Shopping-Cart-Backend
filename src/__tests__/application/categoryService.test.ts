import { CategoryService } from "../../application/categoryService";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository";

describe("CategoryService", () => {
  let categoryService: CategoryService;
  let mockCategoryRepository: CategoryRepository;

  beforeAll(() => {
    mockCategoryRepository = {
      getCategoryById: jest.fn(),
      getAllCategories: jest.fn(),
      getProductsByCategoryId: jest.fn(),
    } as unknown as CategoryRepository;

    categoryService = new CategoryService(mockCategoryRepository);
  });

  describe("getCategoryById", () => {
    it("should return category by id", async () => {
      const categoryId = 4;
      (mockCategoryRepository.getCategoryById as jest.Mock).mockResolvedValue({
        id: categoryId,
        categoryName: "Shirts",
      });

      const result = await categoryService.getCategoryById(categoryId);

      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(
        categoryId
      );
      expect(result?.id).toBe(categoryId);
    });
  });

  describe("getAllProducts", () => {
    it("should return all categories", async () => {
      (mockCategoryRepository.getAllCategories as jest.Mock).mockResolvedValue([
        {
          id: 1,
          categoryName: "T shirt",
        },
        {
          id: 2,
          categoryName: "Ladies Wear",
        },
        {
          id: 3,
          categoryName: "T-shirts",
        },
      ]);

      const result = await categoryService.getAllCategories();
      expect(mockCategoryRepository.getAllCategories).toHaveBeenCalled();
      expect(result).toHaveLength(3);
    });
  });

  describe("getProductsByCategoryId", () => {
    const categoryId = 10;
    it("should return all products for given categoryId", async () => {(
      mockCategoryRepository.getProductsByCategoryId as jest.Mock
      ).mockResolvedValue([
        {
          category_id: categoryId,
          category_categoryName: "T shirt",
          product_productName: "Moose Tshirt",
        },
        {
          category_id: categoryId,
          category_categoryName: "T shirt",
          product_productName: "Uptown Tshirt",
        },
      ]);

      await categoryService.getProductsByCategoryId(categoryId);
      expect(mockCategoryRepository.getProductsByCategoryId).toHaveBeenCalledWith(categoryId);
    });
  });
});
