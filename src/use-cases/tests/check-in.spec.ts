import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "../check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInRepository, gymsRepository)
        vi.useFakeTimers()

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'NodeJS Academy',
            phone: '',
            description: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    // TDD - Test-driven development
    // States sequencies - red, green, refactor

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(async () => {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: 0,
            userLongitude: 0
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 5, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'NodeJS Academy',
            phone: '',
            description: '',
            latitude: new Decimal(-25.474004),
            longitude: new Decimal(-49.2378474)
        })
    
        expect(async () => {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-02',
                userLatitude: -25.5295488,
                userLongitude: -49.2109824
            })
        }).rejects.toBeInstanceOf(Error)
    
    })

})