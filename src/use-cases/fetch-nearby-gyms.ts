import { Gym } from "@prisma/client"
import { FindManyNearbyParam, GymRepository } from "@/repositories/prisma/gyms-repository"

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: GymRepository) {
    }

    execute = async ({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> => {
        const params: FindManyNearbyParam = { latitude: userLatitude, longitude: userLongitude }
        const gyms = await this.gymsRepository.findManyNearby(params)

        return { gyms }
    }
}