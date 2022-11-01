import { User } from "../infra/typeorm/entities/User";
import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

export class UserMap {

    static toDTO({ email, name, id, avatar, driver_license, avatar_url }: User): IUserResponseDTO {

        const user = instanceToInstance({
            email, 
            name, 
            id,   
            avatar, 
            driver_license,
            avatar_url
        })

        return user;

    }

}
