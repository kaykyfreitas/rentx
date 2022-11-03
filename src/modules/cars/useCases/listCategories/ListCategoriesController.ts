import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = container.resolve(ListCategoriesUseCase);

    const list = await useCase.execute();

    return response.json(list);
  }
}
