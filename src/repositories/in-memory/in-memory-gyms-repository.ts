import { randomUUID } from "crypto";
import { FindManyNearbyParam, GymRepository } from "../prisma/gyms-repository";
import { Gym, Prisma } from "@prisma/client";
import { Coordinate, getDistanceBetweenCoordinates } from "utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymRepository {
    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find(item => item.id === id)
        if (!gym) {
            return null
        }
        return gym
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString())
        }
        this.items.push(gym)
        return gym
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        return this.items
            .filter(item => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }

    async findManyNearby(params: FindManyNearbyParam): Promise<Gym[]> {
        return this.items.filter((item) => {
            const from: Coordinate = { latitude: params.latitude, longitude: params.longitude }
            const to: Coordinate = { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }

            const distance = getDistanceBetweenCoordinates(from, to)
            return distance < 10
        })
    }
}