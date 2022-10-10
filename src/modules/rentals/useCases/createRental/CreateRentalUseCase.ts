import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentals } from "@modules/rentals/repositories/IRentals";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("Rentals")
        private rentals: IRentals,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimumHours = 24; 
        const carUnavailable = await this.rentals.findOpenRentalByCar(car_id);

        if(carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentals.findOpenRentalByUser(user_id);

        if(rentalOpenToUser) {
            throw new AppError("There is a rental in progress for this user");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);
        
        if(compare < minimumHours) {
            throw new AppError("Invalid return time")
        }

        const rental = await this.rentals.create({
            user_id,
            car_id,
            expected_return_date
        })

        return rental;
    }

}

export { CreateRentalUseCase }