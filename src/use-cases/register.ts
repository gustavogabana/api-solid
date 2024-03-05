import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

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
    
        const userWithTheSameEmail = await prisma.user.findUnique({where: {email}})
    
        if (userWithTheSameEmail) {
            throw new Error('E-mail already exists.')
        }
    
        await this.usersRepository.create({
            name, email, password_hash
        })
    }
}