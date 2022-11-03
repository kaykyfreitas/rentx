import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const rentalRoutes = Router();

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  new DevolutionRentalController().handle
);

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  new CreateRentalController().handle
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  new ListRentalsByUserController().handle
);

export { rentalRoutes };
