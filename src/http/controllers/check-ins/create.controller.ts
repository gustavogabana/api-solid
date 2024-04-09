import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

export const create = async (req: FastifyRequest, res: FastifyReply) => {
    const createCheckInsParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckInsBodySchema = z.object({
        userLatitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })
    
    const { gymId } = createCheckInsParamsSchema.parse(req.params)
    const { userLatitude, userLongitude } = createCheckInsBodySchema.parse(req.body)
    
    const checkInUseCase = makeCheckInUseCase()
    await checkInUseCase.execute({
        gymId,
        userId: req.user.sub,
        userLatitude, 
        userLongitude
    })
    
    return res.status(201).send()
}