import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymsUseCase } from "../search-gyms"

export const makeSearchGymsUseCase = () => {
    const gymsRepository = new InMemoryGymsRepository()
    const useCase = new SearchGymsUseCase(gymsRepository)

    return useCase
}