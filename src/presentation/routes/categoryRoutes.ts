import Container from "typedi";
import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();

const categoryController = Container.get(CategoryController)

router.get("/getCategoryById/:categoryId", categoryController.onGetCategoryById.bind(categoryController))
export default router;