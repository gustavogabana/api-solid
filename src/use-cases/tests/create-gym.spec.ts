import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

// SUT = System Under Test
let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to create a gym', async () => {
        const { gym } = await sut.execute({
            title: 'Ultimate Gym',
            description: 'NodeJS Gym',
            phone: null,
            latitude: -25.5295488,
            longitude: -49.2109824
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})