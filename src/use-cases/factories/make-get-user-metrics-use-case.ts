import { GetUserMetricsUseCase } from "../get-user-metrics"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeUserMetricsUseCase = () => {
    const checkInsRepository = new InMemoryCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
}