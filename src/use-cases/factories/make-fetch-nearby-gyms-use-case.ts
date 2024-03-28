import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms"

export const makeFetchNearbyGymsUseCase = () => {
    const gymsRepository = new InMemoryGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
}