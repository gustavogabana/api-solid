import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "../create-gym"

export const makeCreateGymUseCase = () => {
    const gymsRepository = new InMemoryGymsRepository()
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
}