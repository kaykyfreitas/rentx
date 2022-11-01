import { ICategories, ICreateCategoryDTO } from "../ICategories";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

export class CategoriesRepositoryInMemory implements ICategories {

    categories: Category[] = [];

    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description
        });

        this.categories.push(category);
    }

}
