import { Router } from "express";

import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";
import { categoriesRoutes } from "@shared/infra/http/routes/categories.routes";
import { specificationsRoutes } from "@shared/infra/http/routes/specifications.routes";
import { usersRoutes } from "@shared/infra/http/routes/users.routes";

import { carsRoutes } from "./cars.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";

const router = Router();

router.use(authenticateRoutes);

router.use("/cars", carsRoutes);

router.use("/users", usersRoutes);

router.use("/rentals", rentalRoutes);

router.use("/categories", categoriesRoutes);

router.use("/specifications", specificationsRoutes);

router.use("/password", passwordRoutes);

export { router };
