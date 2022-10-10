import { CarImage } from "../infra/typeorm/entities/CarImage"

interface ICarsImages {

    create(car_id: string, image_name: string): Promise<CarImage>;

}

export { ICarsImages }