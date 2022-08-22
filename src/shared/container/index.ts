import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRespository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategories } from "../../modules/cars/repositories/ICategories";
import { Categories } from "../../modules/cars/repositories/implementations/Categories";
import { Specifications } from "../../modules/cars/repositories/implementations/Specifications";
import { ISpecifications } from "../../modules/cars/repositories/ISpecifications";

// ICategories
container.registerSingleton<ICategories>("Categories", Categories);

container.registerSingleton<ISpecifications>("Specifications", Specifications);

container.registerSingleton<IUsersRespository>("UsersRepository", UsersRepository);