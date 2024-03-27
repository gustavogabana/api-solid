import { Gym } from "@prisma/client"
import { GymRepository } from "@/repositories/gyms-repository"

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    constructor(private gymsRepository: GymRepository) {
    }

    execute = async ({query,page}: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> => {
        const gyms = await this.gymsRepository.searchMany(query,page)

        return { gyms }
    }
}