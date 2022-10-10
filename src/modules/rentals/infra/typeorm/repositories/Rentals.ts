import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentals } from "@modules/rentals/repositories/IRentals";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class Rentals implements IRentals {

    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({ car_id });
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({ user_id });
        return openByUser;
    }
    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date
        });

        await this.repository.save(rental);

        return rental;
    }

}

export { Rentals }