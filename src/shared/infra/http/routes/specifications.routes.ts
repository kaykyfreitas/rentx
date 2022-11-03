import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

import { ensureAdmin } from "../middleware/ensureAdmin";

const specificationsRoutes = Router();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new CreateSpecificationController().handle
);

export { specificationsRoutes };
