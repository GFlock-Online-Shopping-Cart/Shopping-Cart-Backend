import { ProductService } from "../../application/productService"; 
import { ProductRepository } from "../../infrastructure/repositories/productRepository"; 
import { Product } from "../../domain/entities/product"; 

describe('ProductService', () => {
    let productService: ProductService;
    let mockProductRepository: ProductRepository;

    beforeAll(() => {
        mockProductRepository =  {
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
        } as unknown as ProductRepository;

        productService = new ProductService(mockProductRepository);
    });

    describe('getAllProducts', () => {
        it("should return all products", async () => {
            (mockProductRepository.getAllProducts as jest.Mock).mockResolvedValue([
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
            ]);
            const result = await productService.getAllProducts();
            expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
            expect(result).toHaveLength(2);
        })
    });

    describe("getProductById", () => {
        it("should return product for given id", async () => {
            const productId = 1;
            (mockProductRepository.getProductById as jest.Mock).mockResolvedValue(
                {
                    "id": productId,
                    "productName": "Moose Tshirt",
                    "productImage": "moose.jpg",
                    "description": "S,M, L, XL sizes are available",
                    "price": "990",
                    "stock": 1000
                  }
            )

            const result = await productService.getProductById(productId);

            expect(mockProductRepository.getProductById).toHaveBeenCalledWith(productId);
            expect(result?.id).toBe(productId);
        });
    });
});