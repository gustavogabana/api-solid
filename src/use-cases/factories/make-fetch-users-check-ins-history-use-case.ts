import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeFetchUsersCheckInsHistoryUseCase = () => {
    const checkInsRepository = new InMemoryCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}