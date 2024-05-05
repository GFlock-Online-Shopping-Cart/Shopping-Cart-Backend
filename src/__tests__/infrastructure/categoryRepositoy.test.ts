import { myDataSource } from "../../config/dataSource";
import { HTTPException } from "../../config/httpException";
import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository";

jest.mock("../../config/dataSource");

describe("CategoryRepository", () => {
  let categoryRepository: CategoryRepository;

  beforeAll(() => {
    categoryRepository = new CategoryRepository();
  });

  describe("getCategoryById", () => {
    it("should return category by id", async () => {
      const categoryId = 5;
      const mockFindOneBy = jest.fn().mockResolvedValue({
        id: categoryId,
        categoryName: "T shirts",
      });
      myDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: mockFindOneBy,
      });

      const result = await categoryRepository.getCategoryById(categoryId);

      expect(myDataSource.getRepository).toHaveBeenCalledWith(Category);
      expect(mockFindOneBy).toHaveBeenCalledWith({ id: categoryId });
      expect(result?.id).toBe(categoryId);
    });

    it("should return undefined for non-existing category id", async () => {
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
    });
  });

  describe("getAllCategories", () => {
    it("should return all products", async () => {
      const mockFind = jest.fn().mockResolvedValue([
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
      myDataSource.getRepository = jest.fn().mockReturnValue({
        find: mockFind,
      });
      const result = await categoryRepository.getAllCategories();

      expect(myDataSource.getRepository).toHaveBeenCalledWith(Category)
      expect(mockFind).toHaveBeenCalled();
      expect(result).toHaveLength(3);
    });
  });

  describe("getProductsByCategoryId", () => {
    it('should return all products for given categoryId', async () => {
      const categoryId = 10;
      const mockFindOneOrFail = jest.fn().mockResolvedValue(categoryId);
      const mockSelect = jest.fn().mockResolvedValue([
        {
          "category_id": categoryId,
          "category_categoryName": "T shirt",
          "product_productName": "Moose Tshirt"
        },
        {
          "category_id": categoryId,
          "category_categoryName": "T shirt",
          "product_productName": "Uptown Tshirt"
        },
      ]);
      myDataSource.getRepository = jest.fn().mockReturnValue({
        findOneOrFail: mockFindOneOrFail
      });
      
      
      (myDataSource.createQueryBuilder as jest.Mock).mockReturnValue({
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockSelect)
      });
      // mockReturnThis() is used to return the current context, allowing to chain function calls. The final function in the chain (getRawMany) is mocked to return mockSelect value
     
      const result = await categoryRepository.getProductsByCategoryId(categoryId);

      expect(result).toEqual(mockSelect);
      expect(myDataSource.createQueryBuilder).toHaveBeenCalledTimes(1)
    });

    it('should handle the error when the categoryId is not exist', async () => {
      const nonExistingCategoryId = 100;
      const mockFindOneBy = jest.fn().mockResolvedValue(undefined);

      myDataSource.getRepository = jest.fn().mockReturnValue({
        findOneBy: mockFindOneBy
      });

      try {
        await categoryRepository.getProductsByCategoryId(nonExistingCategoryId);
      } catch(error: any) {
        expect(error).toBeInstanceOf(HTTPException);
        expect(error.message).toEqual("Category is not found");
        expect(error.statusCode).toEqual(404);
      }
      
      
    })
  })
});
