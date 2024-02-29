// import { ProductService } from '../../application/productService'; 
// import { IProductRepository } from '../../domain/productRepository'; 

// // Mocking the repository
// const mockProductRepository: jest.Mocked<IProductRepository> = {
//   getAllProducts: jest.fn(),
//   getProductById: jest.fn(),
// };

// // Creating a new instance of ProductService with the mocked repository
// const productService = new ProductService(mockProductRepository);

// describe('ProductService', () => {
//   it('should get all products', async () => {
//     // Mocking the repository method
//     mockProductRepository.getAllProducts.mockResolvedValueOnce([
//       /* Mocked products here */
//     ]);

//     const result = await productService.getAllProducts();

//     expect(result).toHaveLength(1); // Adjust as per your mock data
//     expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
//   });

// //   it('should get product by id', async () => {
// //     // Mocking the repository method
// //     mockProductRepository.getProductById.mockResolvedValueOnce(/* Mocked product here */);

// //     const result = await productService.getProductById(1);

// //     expect(result).toBeDefined(); // Adjust as per your mock data
// //     expect(mockProductRepository.getProductById).toHaveBeenCalledWith(1);
// //   });
// });
