import { specificationsRoutes } from "@shared/infra/http/routes/specifications.routes";
import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { idText } from "typescript";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
    async handle( request: Request, reponse: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const cars = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id
        })

        return response.json(cars);
    }

}

export { CreateCarSpecificationController }