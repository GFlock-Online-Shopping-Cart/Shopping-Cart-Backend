import { Router } from "express"; 
import { ProductController } from "../controllers/ProductController"; 
import { ProductRepository } from "../../infrastructure/repositories/productRepository"; 
import { ProductService } from "../../application/productService"; 

const router = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get("/products", productController.onGetAllProducts.bind(productController))
router.get("/getProductById/:productId", productController.onGetProductById.bind(productController))
export default router;