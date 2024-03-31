import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeAuthenticateUseCase = () => {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}