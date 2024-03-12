import Container from "typedi";
import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();

const categoryController = Container.get(CategoryController)

router.get("/getCategoryById/:categoryId", categoryController.onGetCategoryById.bind(categoryController));
router.get("/getAllCategories", categoryController.onGetAllCategories.bind(categoryController));
router.get("/getProductsBycategoryId/:categoryId", categoryController.onGetProductsByCategoryId.bind(categoryController));
export default router;