import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {

    async handle(request: Request,response: Response): Promise<Response> {
        const { id } = request.user;
        const { car_id, expected_return_date } = request.body;
        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        const rental = await createRentalUseCase.execute({
            car_id,
            user_id: id,
            expected_return_date
        })

        return response.status(201).json(rental);

    }

}
