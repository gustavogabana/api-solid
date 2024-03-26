import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

// SUT = System Under Test
let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -25.5295488,
            longitude: -49.2109824
        })

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: null,
            phone: null,
            latitude: -25.5295488,
            longitude: -49.2109824
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'JavaScript Gym'})
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Node Gym ${i}`,
                description: null,
                phone: null,
                latitude: -25.5295488,
                longitude: -49.2109824
            })
        }

        const { gyms } = await sut.execute({
            query: 'Node',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Node Gym 21'}),
            expect.objectContaining({title: 'Node Gym 22'})
        ])

    })

})