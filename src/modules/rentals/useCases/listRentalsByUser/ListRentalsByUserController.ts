import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

export class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listRentalByUserUseCase = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listRentalByUserUseCase.execute(id);

    return response.json(rentals);
  }
}
