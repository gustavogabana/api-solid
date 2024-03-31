import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeFetchUsersCheckInsHistoryUseCase = () => {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}