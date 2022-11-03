import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new CreateCategoryController().handle
);

categoriesRoutes.get("/", new ListCategoriesController().handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  new ImportCategoryController().handle
);

export { categoriesRoutes };
