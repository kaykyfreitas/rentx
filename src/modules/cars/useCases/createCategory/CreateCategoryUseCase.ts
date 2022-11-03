import { inject, injectable } from "tsyringe";

import { ICategories } from "@modules/cars/repositories/ICategories";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(@inject("Categories") private repository: ICategories) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    await this.repository.create({ name, description });
  }
}
