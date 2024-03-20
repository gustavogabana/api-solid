import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInRepository)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    // TDD - Test-driven development
    // States sequencies - red, green, refactor

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(async () => {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-01'
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        vi.setSystemTime(new Date(2022, 0, 5, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})