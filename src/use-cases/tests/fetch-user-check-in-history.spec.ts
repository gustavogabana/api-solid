import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {

    // TDD - Test-driven development
    // States sequencies - red, green, refactor

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
    })

    it('should be able to fetch user check-in history', async () => {
        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
            created_at: new Date(),
            validated_at: new Date()
        })

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkIns } = await sut.execute({ 
            userId: 'user-01',
            page: 1
        })

        expect(checkIns.length).toBeGreaterThan(0)
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })
        ])
    })

    it('should be able to fetch user paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01'
            })
        }

        const { checkIns } = await sut.execute({ 
            userId: 'user-01',
            page: 2
         })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' })
        ])
    })

})