import { GymRepository } from "../prisma/gyms-repository";
import { Gym } from "@prisma/client";

export class InMemoryGymsRepository implements GymRepository {
    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {

        const gym = this.items.find(item => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }
}