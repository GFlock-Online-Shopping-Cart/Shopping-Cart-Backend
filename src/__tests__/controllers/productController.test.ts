import { ProductController } from '../../presentation/controllers/ProductController'; 
import { ProductService } from '../../application/productService';
import { Request, Response, NextFunction } from 'express';

describe('ProductController', () => {
  let productController: ProductController;
  let mockProductService: ProductService;

  beforeAll(() => {
    // Create a mock instance of ProductService
    mockProductService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
    } as unknown as ProductService;

    // Create an instance of ProductController with the mock ProductService
    productController = new ProductController(mockProductService);
  });

  describe('getAllProducts', () => {
    const mockRequest = {} as Request;
    const mockResponse = { 
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const mockNextFunction = jest.fn() as NextFunction;

    const mockError = new Error('Some error occurred.');

    it('should get all products successfully', async () => {
      const mockProducts = [
          {
              "id": 1,
              "productName": "Moose Tshirt",
              "productImage": "moose.jpg",
              "description": "S,M, L, XL sizes are available",
              "price": "990",
              "stock": 1000
            },
            {
              "id": 2,
              "productName": "Jump Suit",
              "productImage": "jump-suit.jpg",
              "description": "S,M, L, XL sizes are available",
              "price": "2200",
              "stock": 1230
            },
      ];
  
      // Mock the behavior of ProductService.getAllProducts
      (mockProductService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
  
      // Call the method to be tested
      await productController.onGetAllProducts(mockRequest, mockResponse, mockNextFunction);
  
      // testing whether the getAllProducts method of the mock service call or not
      expect(mockProductService.getAllProducts).toHaveBeenCalled();
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'success', data: mockProducts });
    });
  
    it('should handle error while getting all products', async () => {
      // Mock the behavior of ProductService.getAllProducts to throw an error
      (mockProductService.getAllProducts as jest.Mock).mockRejectedValue(mockError);
  
      // Call the method to be tested
      await productController.onGetAllProducts(mockRequest, mockResponse, mockNextFunction);
  
      expect(mockProductService.getAllProducts).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getProductById', () => {
    const productId = 1;
      const mockRequest = {} as Request;
      const mockResponse = { 
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
      const mockNextFunction = jest.fn() as NextFunction;
      
      const mockProduct = [
          {
              "id": productId,
              "productName": "Moose Tshirt",
              "productImage": "moose.jpg",
              "description": "S,M, L, XL sizes are available",
              "price": "990",
              "stock": 1000
            }
      ];

      it('it should get product for given id', async () => {
        (mockProductService.getProductById as jest.Mock).mockResolvedValue(mockProduct);
        
        mockRequest.params = { productId } as any;
        await productController.onGetProductById(mockRequest, mockResponse, mockNextFunction);
  
        expect(mockProductService.getProductById).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Success', data: mockProduct })
      });

      it("should handle the error while getting product by id", async () => {
        (mockProductService.getProductById as jest.Mock).mockImplementation(async () => Promise.reject(new Error("Internal server error")));
        try {
          await productController.onGetProductById(mockRequest, mockResponse, mockNextFunction);

        } catch(error) {
          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(mockResponse.json).toHaveBeenCalledWith({ message: "Internal server error" });
        }
      });

      it("should handle the not found error while getting product by id", async () => {
        (mockProductService.getProductById as jest.Mock).mockResolvedValueOnce(null)
        try {
          await productController.onGetProductById(mockRequest, mockResponse, mockNextFunction);

        } catch(error) {

          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith({message: "The product is not found"});
        }
      });

  })
});
