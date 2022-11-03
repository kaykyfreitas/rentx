import { inject, injectable } from "tsyringe";

import { ICarsImages } from "@modules/cars/repositories/ICarsImages";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarsImages")
    private carsImages: ICarsImages,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImages.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}
