import { randomUUID } from "crypto";
import { GymRepository } from "../prisma/gyms-repository";
import { Gym, Prisma } from "@prisma/client";

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
}