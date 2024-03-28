import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CheckInUseCase } from "../check-in"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeCheckInUseCase = () => {
    const checkInsRepository = new InMemoryCheckInsRepository()
    const gymsRepository = new InMemoryGymsRepository()
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}