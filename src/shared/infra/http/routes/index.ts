import { Router } from "express";

import { usersRoutes } from "@shared/infra/http/routes/users.routes";
import { categoriesRoutes } from "@shared/infra/http/routes/categories.routes";
import { specificationsRoutes } from "@shared/infra/http/routes/specifications.routes";
import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";

const router = Router();

router.use(authenticateRoutes);

router.use("/users", usersRoutes);

router.use("/categories", categoriesRoutes);

router.use("/specifications", specificationsRoutes);

export { router };