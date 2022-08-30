import { inject, injectable } from "tsyringe";
import { ICreateCategoryDTO } from "../../../cars/repositories/ICategories";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRespository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt"
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRespository
    ){}

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError("User already exists")
        }

        const passwordHash = await hash(password, 8)

        await this.userRepository.create({
            name, 
            email, 
            password: passwordHash,
            driver_license 
        })
    }

}

export { CreateUserUseCase }