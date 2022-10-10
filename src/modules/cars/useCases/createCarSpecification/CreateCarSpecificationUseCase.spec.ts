import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CrasRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateSpecificationsCars1664412295382 } from "@shared/infra/typeorm/migrations/1664412295382-CreateSpecificationsCars";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory;
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory, 
            specificationsRepositoryInMemory
        );
 
    });

    it("Should not be able to add a new specification to a non-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test name1", 
            description: "Test description1", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 50, 
            brand: "Tests brand1", 
            category_id: "Test category id1"
        })
        const specification = await specificationsRepositoryInMemory.create({
            description: "Test",
            name: "Test"
        })

        const specifications_id = [specification.id];
        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });

})