import { inject, injectable } from "tsyringe";
import { IRentals } from "@modules/rentals/repositories/IRentals";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
export class ListRentalsByUserUseCase {

    constructor(
        @inject("Rentals")
        private rentals: IRentals
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentals.findByUser(user_id);

        return rentalsByUser;

    }
}
