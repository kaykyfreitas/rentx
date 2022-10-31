import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let createCategoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {

    beforeEach(() => {
        createCategoryRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(createCategoryRepositoryInMemory);
    });

    it("Should be able to create a new category", async () => {

        const category = {
            name: "Category test",
            description: "Description test"
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await createCategoryRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");

    });

    it("Should not be able to create a new category with name exists", async () => {

        const category = {
            name: "Category test",
            description: "Description test"
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        await expect(

            createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })

        ).rejects.toEqual(new AppError("Category already exists"));

    });

});