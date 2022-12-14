import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategories } from "@modules/cars/repositories/ICategories";

@injectable()
export class ListCategoriesUseCase {
  constructor(@inject("Categories") private repository: ICategories) {}

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();

    return categories;
  }
}
