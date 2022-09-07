import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO, ISpecifications } from "@modules/cars/repositories/ISpecifications";
import { Specification } from "../entities/Specification";




class Specifications implements ISpecifications {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        })

        await this.repository.save(specification);
    }
    
    async findByName(name: string): Promise<Specification | undefined> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }
    
}

export { Specifications };