import { inject, injectable} from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategories } from "@modules/cars/repositories/ICategories";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {

    constructor( @inject("Categories") private repository: ICategories ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.repository.findByName(name);

        if(categoryAlreadyExists) {
            throw new AppError("Category already exists");
        }
    
        await this.repository.create({ name, description });
    }
    
}

