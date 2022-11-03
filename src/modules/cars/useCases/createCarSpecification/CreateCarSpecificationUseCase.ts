import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecifications } from "@modules/cars/repositories/ISpecifications";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("Cars")
    private cars: ICarsRepository,

    @inject("Specifications")
    private specifications: ISpecifications
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.cars.findById(car_id);

    if (!carExists) {
      throw new AppError("Car doesn't exists");
    }

    const specifications = await this.specifications.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.cars.create(carExists);

    return carExists;
  }
}
