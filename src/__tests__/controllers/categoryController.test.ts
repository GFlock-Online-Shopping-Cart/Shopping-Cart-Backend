import { Request, Response, NextFunction } from "express";
import { CategoryController } from "../../presentation/controllers/CategoryController";
import { CategoryService } from "../../application/categoryService";

describe("CategoryController", () => {
  let categoryController: CategoryController;
  let mockCategoryService: CategoryService;

  beforeAll(() => {
    mockCategoryService = {
      getCategoryById: jest.fn(),
      getAllCategories: jest.fn(),
      getProductsByCategoryId: jest.fn(),
    } as unknown as CategoryService;

    categoryController = new CategoryController(mockCategoryService);
  });

  describe("getCategoryById", () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const mockNextFunction = jest.fn() as NextFunction;
    const mockError = new Error("Some error occurred,");
    const categoryId = 1;
    const mockCategory = {
      id: categoryId,
      categoryName: "Shirts",
    };

    it("should get category by id", async () => {
      (mockCategoryService.getCategoryById as jest.Mock).mockResolvedValue(
        mockCategory
      );
      mockRequest.params = { categoryId } as any;
      await categoryController.onGetCategoryById(
        mockRequest,
        mockResponse,
        mockNextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockCategory,
      });
    });

    it("should handle the error while getting category by id", async () => {
      (mockCategoryService.getCategoryById as jest.Mock).mockImplementation(
        async () => Promise.reject(new Error("internal server error"))
      );

      try {
        await categoryController.onGetCategoryById(
          mockRequest,
          mockResponse,
          mockNextFunction
        );
      } catch (error) {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "Internal server error",
        });
        expect(mockNextFunction).toHaveBeenCalledWith(mockError);
      }
    });

    it("should handle the not found error while getting the category by id", async () => {
      (mockCategoryService.getCategoryById as jest.Mock).mockResolvedValue(
        null
      );
      try {
        await categoryController.onGetCategoryById(
          mockRequest,
          mockResponse,
          mockNextFunction
        );
      } catch (error) {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "The category is not found",
        });
      }
    });
  });

  describe("getAllCategories", () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const mockNextFunction = jest.fn() as NextFunction;
    const mockError = new Error("Some error occurred");

    it("should get all categories successfully", async () => {
      const mockCategories = [
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
      ];

      (mockCategoryService.getAllCategories as jest.Mock).mockResolvedValue(
        mockCategories
      );
      await categoryController.onGetAllCategories(
        mockRequest,
        mockResponse,
        mockNextFunction
      );

      expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockCategories,
      });
    });

    it("should handle error while getting all categories", async () => {
      (mockCategoryService.getAllCategories as jest.Mock).mockRejectedValue(
        mockError
      );

      await categoryController.onGetAllCategories(
        mockRequest,
        mockResponse,
        mockNextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getProductsByCategoryId", () => {
    const categoryId = 10;
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const mockNextFunction = jest.fn() as NextFunction;

    const mockProducts = [
      {
        "category_id": categoryId,
        "category_categoryName": "T shirt",
        "product_productName": "Moose Tshirt",
      },
      {
        "category_id": categoryId,
        "category_categoryName": "T shirt",
        "product_productName": "Uptown Tshirt",
      },
    ];

    it('should get the products for given categoryId', async() => {
      (mockCategoryService.getProductsByCategoryId as jest.Mock).mockResolvedValue(mockProducts);
      mockRequest.params = {categoryId} as any;
      await categoryController.onGetProductsByCategoryId(mockRequest, mockResponse, mockNextFunction);

      expect(mockCategoryService.getProductsByCategoryId).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({message: "Success", data: mockProducts})
    });

    it('should handle the error while getting the products by categoryId', async() => {
      const mockError = new Error('Some error occurred');
      (mockCategoryService.getProductsByCategoryId as jest.Mock).mockRejectedValue(mockError);

      await categoryController.onGetProductsByCategoryId(mockRequest, mockResponse, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    })
  });
});
