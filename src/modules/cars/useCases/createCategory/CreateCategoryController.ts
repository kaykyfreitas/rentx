import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        
        const useCase = container.resolve(CreateCategoryUseCase);

        await useCase.execute({ name, description });
    
        return response.status(201).send();
    }
    
}
