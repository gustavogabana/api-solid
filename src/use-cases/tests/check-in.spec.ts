import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "../check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { MaxNumbersOfCheckIns } from "../errors/max-numbers-of-check-ins";
import { MaxDistanceError } from "../errors/max-distance-error";

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInRepository, gymsRepository)
        vi.useFakeTimers()

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Ultimate Gym',
            description: 'NodeJS Gym',
            phone: null,
            latitude: -25.474004,
            longitude: -49.2109824
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -25.474004,
            userLongitude: -49.2109824
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
            userLatitude: -25.474004,
            userLongitude: -49.2109824
        })

        expect(async () => {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: -25.474004,
                userLongitude: -49.2109824
            })
        }).rejects.toBeInstanceOf(MaxNumbersOfCheckIns)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -25.474004,
            userLongitude: -49.2109824
        })

        vi.setSystemTime(new Date(2022, 0, 5, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -25.474004,
            userLongitude: -49.2109824
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {

        await gymsRepository.create({
            id: 'gym-02',
            title: 'NodeJS Academy',
            phone: '',
            description: '',
            latitude: -25.474004,
            longitude: -49.2378474
        })
    
        expect(async () => {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-02',
                userLatitude: -25.474004,
                userLongitude: -49.2109824
            })
        }).rejects.toBeInstanceOf(MaxDistanceError)
    
    })

})