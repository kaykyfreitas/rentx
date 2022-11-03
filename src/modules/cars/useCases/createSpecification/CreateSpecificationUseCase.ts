import { inject, injectable } from "tsyringe";

import { ISpecifications } from "@modules/cars/repositories/ISpecifications";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(@inject("Specifications") private repository: ISpecifications) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.repository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    this.repository.create({ name, description });
  }
}
