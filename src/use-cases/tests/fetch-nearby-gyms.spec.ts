import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

// SUT = System Under Test
let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -25.5295488,
            longitude: -49.2109824
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -25.4530151,
            longitude: -49.5327317
        })

        const { gyms } = await sut.execute({
            userLatitude: -25.5295488,
            userLongitude: -49.2109824
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Near Gym'})
        ])
    })

})
