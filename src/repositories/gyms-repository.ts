import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParam {
    latitude: number
    longitude: number
}

export interface GymRepository {
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: FindManyNearbyParam): Promise<Gym[]>
}