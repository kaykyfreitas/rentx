import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Cars } from "@modules/cars/infra/typeorm/repositories/Cars";
import { CarsImages } from "@modules/cars/infra/typeorm/repositories/CarsImages";
import { Categories } from "@modules/cars/infra/typeorm/repositories/Categories";
import { Specifications } from "@modules/cars/infra/typeorm/repositories/Specifications";
import { ICarsImages } from "@modules/cars/repositories/ICarsImages";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategories } from "@modules/cars/repositories/ICategories";
import { ISpecifications } from "@modules/cars/repositories/ISpecifications";
import { Rentals } from "@modules/rentals/infra/typeorm/repositories/Rentals";
import { IRentals } from "@modules/rentals/repositories/IRentals";

import "@shared/container/providers";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

container.registerSingleton<ICarsRepository>("Cars", Cars);

container.registerSingleton<ICategories>("Categories", Categories);

container.registerSingleton<ISpecifications>("Specifications", Specifications);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsImages>("CarsImages", CarsImages);

container.registerSingleton<IRentals>("Rentals", Rentals);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
