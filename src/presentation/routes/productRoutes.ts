import Container from "typedi";
import { Router } from "express"; 
import { ProductController } from "../controllers/ProductController"; 

const router = Router();

const productController = Container.get(ProductController)
router.get("/products", productController.onGetAllProducts.bind(productController))
router.get("/getProductById/:productId", productController.onGetProductById.bind(productController))
export default router;