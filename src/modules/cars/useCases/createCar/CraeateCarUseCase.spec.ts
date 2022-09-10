import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CrasRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory;
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Test name", 
            description: "Test description", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 50, 
            brand: "Tests brand", 
            category_id: "Test category id"
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to crate a car whith exixtst license plate", () => {
        expect(async () => {

            await createCarUseCase.execute({
                name: "Test name1", 
                description: "Test description1", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 50, 
                brand: "Tests brand1", 
                category_id: "Test category id1"
            });

            await createCarUseCase.execute({
                name: "Test name2", 
                description: "Test description2", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 50, 
                brand: "Tests brand2", 
                category_id: "Test category id2"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to crate a car whith available true by default", async () => {

            const car = await createCarUseCase.execute({
                name: "Test available", 
                description: "Test description", 
                daily_rate: 100, 
                license_plate: "ABCD-1234", 
                fine_amount: 50, 
                brand: "Tests brand1", 
                category_id: "Test category id1"
            });

            expect(car.available).toBe(true);

    });
});