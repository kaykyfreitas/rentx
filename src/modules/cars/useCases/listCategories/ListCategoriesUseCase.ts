import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/entities/Category";
import { ICategories } from "@modules/cars/repositories/ICategories";

@injectable()
class ListCategoriesUseCase {
    constructor( @inject("Categories") private repository: ICategories ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.repository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };