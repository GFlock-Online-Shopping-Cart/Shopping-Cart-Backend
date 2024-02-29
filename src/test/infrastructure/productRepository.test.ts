// import { ProductRepository } from "../../infrastructure/repositories/productRepository"; 
// import { myDataSource } from "../../config/dataSource"; 
// import { Category } from "../../domain/entities/category";

// jest.mock('../../config/dataSource');

// describe('ProductRepository', () => {
//     let productRepository;

//     beforeEach(() => {
//         productRepository = new ProductRepository();
//     });

//     it('should return all products', async () => {
//         const mockCategory = new Category();
//         mockCategory.id = 1;
//         mockCategory.categoryName = "Category1";
//         mockCategory.products = [];

//         const mockProducts = [
//             {
//                 id: 1, 
//                 productName: "Product1", 
//                 price: 900.00 ,
//                 productImage: "product1-jpg",
//                 description: "Product1 description",
//                 stock: 1000,
//                 categories: mockCategory,
//             },
//             { 
//                 id:2, 
//                 productName: "Product2", 
//                 price: 1200.00 ,
//                 productImage: "product2-jpg",
//                 description: "Product2 description",
//                 stock: 650,
//                 categories: mockCategory
//             }
//         ];
            

//         (myDataSource.getRepository as jest.Mock).mockReturnValue({
//             find: jest.fn().mockResolvedValue(mockProducts),
//         });

//         const products = await ProductRepository.getAllProducts();
//         expect(products).toEqual(mockProducts);
//     });
// })