import { getRepository, Repository } from "typeorm";

import { ICarsImages } from "@modules/cars/repositories/ICarsImages";

import { CarImage } from "../entities/CarImage";

export class CarsImages implements ICarsImages {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}
