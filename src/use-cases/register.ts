import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

export class RegisterUseCase {

    constructor(private usersRepository: UsersRepository) {
    }

    execute = async ({
        name, email, password
    }: RegisterUseCaseRequest) => {
        const password_hash = await hash(password, 6)
    
        const userWithTheSameEmail = await this.usersRepository.findByEmail(email)
    
        if (userWithTheSameEmail) {
            throw new UserAlreadyExistsError()
        }
    
        await this.usersRepository.create({
            name, email, password_hash
        })
    }
}