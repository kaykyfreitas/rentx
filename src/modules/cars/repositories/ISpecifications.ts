import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecifications {
    findByName(name: string): Promise<Specification | undefined>;
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecifications, ICreateSpecificationDTO };