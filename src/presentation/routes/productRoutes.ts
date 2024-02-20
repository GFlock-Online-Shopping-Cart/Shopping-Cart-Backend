import { Router } from "express"; 
import { ProductConstroller } from "../controllers/ProductConstroller"; 
import { ProductRepository } from "../../infrastructure/repositories/productRepository"; 
import { ProductService } from "../../application/productService"; 

const router = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductConstroller(productService);

router.get("/products", productController.onGetAllProducts.bind(productController))
router.get("/getProductById/:productId", productController.onGetProductById.bind(productController))
export default router;