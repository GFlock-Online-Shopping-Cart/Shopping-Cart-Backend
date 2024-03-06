import { myDataSource } from "../../config/dataSource";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";

jest.mock("../../config/dataSource");

describe("productRepository", () => {
  let productRepository: ProductRepository;
  
  beforeAll(() => {
    productRepository = new ProductRepository();
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const mockFind = jest.fn().mockResolvedValue([
        {
          id: 10,
          productName: "Moose Tshirt",
          productImage: "moose.jpg",
          description: "S,M, L, XL sizes are available",
          price: 990.00,
          stock: 1000,
        },
        {
          id: 11,
          productName: "Jump Suit",
          productImage: "jump-suit.jpg",
          description: "S,M, L, XL sizes are available",
          price: 2200.00,
          stock: 1230,
        },
      ]);
      myDataSource.getRepository = jest.fn().mockReturnValue({
        find: mockFind,
      });
      const result = await productRepository.getAllProducts();

      expect(myDataSource.getRepository).toHaveBeenCalledWith(Product);
      expect(mockFind).toHaveBeenCalled();
      expect(result).toHaveLength(2);
    });
  });

  describe("getProductById", () => {
    it("should return product by id", async () => {
      const productId = 1;
      const mockFindOneBy = jest.fn().mockResolvedValue({
        id: productId,
        productName: "Product 1",
        productImage: "jump-suit.jpg",
        description: "S,M, L, XL sizes are available",
        price: 2200.00,
        stock: 1230,
      });
      myDataSource.getRepository = jest
        .fn()
        .mockReturnValue({ findOneBy: mockFindOneBy });

      const result = await productRepository.getProductById(productId);

      expect(myDataSource.getRepository).toHaveBeenCalledWith(Product);
      expect(mockFindOneBy).toHaveBeenCalledWith({ id: productId });
      expect(result?.id).toBe(productId);
    });

    it("should return undefined for non-existing product id", async () => {
      const nonExistingProductId = 100;
      const mockFindOneBy = jest.fn().mockResolvedValue(undefined);
      myDataSource.getRepository = jest
        .fn()
        .mockReturnValue({ findOneBy: mockFindOneBy });

      const result = await productRepository.getProductById(
        nonExistingProductId
      );

      expect(myDataSource.getRepository).toHaveBeenCalledWith(Product);
      expect(mockFindOneBy).toHaveBeenCalledWith({ id: nonExistingProductId });
      expect(result).toBeUndefined();
    });
  });
});
