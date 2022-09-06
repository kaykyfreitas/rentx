import { Category } from "../../entities/Category";
import { ICategories, ICreateCategoryDTO } from "../ICategories";

class CategoriesRepositoryInMemory implements ICategories {

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

export { CategoriesRepositoryInMemory }