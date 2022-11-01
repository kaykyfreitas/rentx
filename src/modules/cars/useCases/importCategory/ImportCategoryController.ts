import { container } from "tsyringe";
import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        const useCase = container.resolve(ImportCategoryUseCase);

        await useCase.execute(file);

        return response.status(201).send();
    }

}
