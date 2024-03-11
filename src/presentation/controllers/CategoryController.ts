import { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../../application/categoryService";

@Service()
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    async onGetCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = Number(req.params.categoryId);
            const category = await this.categoryService.getCategoryById(categoryId);
            if(!category) {
                res.status(404).json({message: "The category is not found"})
            } else {
                res.status(200).json({message: "Success", data: category})
            } 
        } catch(err) {
            res.status(500).json({message: "Internal server error"});
            next(err);
        }
    }

    async onGetAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const allCategories = await this.categoryService.getAllCategories()
            res.status(200).json({message: "Success", data: allCategories})
        } catch(err) {
            res.status(500).json({message: "Internal server error"});
            next(err);
        }
    }
}