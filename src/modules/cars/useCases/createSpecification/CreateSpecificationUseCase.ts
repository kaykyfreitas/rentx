import { inject, injectable } from "tsyringe";

import { ISpecifications } from "../../repositories/ISpecifications";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor( @inject("Specifications") private repository: ISpecifications ) {}
 
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.repository.findByName(name);

        if(specificationAlreadyExists) {
            throw new Error("Specification already exists");
        }

        this.repository.create({ name, description });
    }

}

export { CreateSpecificationUseCase }