import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategories {
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
