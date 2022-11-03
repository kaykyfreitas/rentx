import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentals } from "@modules/rentals/repositories/IRentals";

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
