import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CrasRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new  CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1", 
            description: "Car description", 
            daily_rate: 100.00, 
            license_plate: "ABC-123", 
            fine_amount: 100.00, 
            brand: "Car_brand", 
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by brand", async  () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1", 
            description: "Car description", 
            daily_rate: 100.00, 
            license_plate: "ABC-123", 
            fine_amount: 100.00, 
            brand: "Car_brand_test", 
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test"
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by name", async  () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car_name_test", 
            description: "Car description", 
            daily_rate: 100.00, 
            license_plate: "ABC-123", 
            fine_amount: 100.00, 
            brand: "Car_brand_test", 
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            name: "Car_name_test"
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by category", async  () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car_name_test", 
            description: "Car description", 
            daily_rate: 100.00, 
            license_plate: "ABC-123", 
            fine_amount: 100.00, 
            brand: "Car_brand_test", 
            category_id: "12345"
        });

        const cars = await listCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);
    });

});