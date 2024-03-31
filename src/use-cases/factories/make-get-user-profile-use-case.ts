import { GetUserProfileUseCase } from "../get-user-profile"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeGetUserProfileUseCase = () => {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new GetUserProfileUseCase(usersRepository)

    return useCase
}