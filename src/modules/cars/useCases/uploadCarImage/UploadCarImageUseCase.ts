import { ICarsImages } from "@modules/cars/repositories/ICarsImages";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {

    constructor(
        @inject("CarsImages")
        private carsImages: ICarsImages
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {

        images_name.map(async (image) => {
            await this.carsImages.create(car_id, image)
        });
    }

}

export { UploadCarImageUseCase }