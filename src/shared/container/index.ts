import { container } from "tsyringe";

import { IUsersRespository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategories } from "@modules/cars/repositories/ICategories";

import { ISpecifications } from "@modules/cars/repositories/ISpecifications";
import { Categories } from "@modules/cars/infra/typeorm/repositories/Categories";
import { Specifications } from "@modules/cars/infra/typeorm/repositories/Specifications";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Cars } from "@modules/cars/infra/typeorm/repositories/Cars";

container.registerSingleton<ICarsRepository>("Cars", Cars);

container.registerSingleton<ICategories>("Categories", Categories);

container.registerSingleton<ISpecifications>("Specifications", Specifications);

container.registerSingleton<IUsersRespository>("UsersRepository", UsersRepository);
