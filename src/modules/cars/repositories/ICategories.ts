import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string
}

interface ICategories {
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category | undefined>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategories, ICreateCategoryDTO }