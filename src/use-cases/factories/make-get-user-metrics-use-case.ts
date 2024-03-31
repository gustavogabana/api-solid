import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUserMetricsUseCase } from "../get-user-metrics"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeUserMetricsUseCase = () => {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
}