import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

export const nearby = async (req: FastifyRequest, res: FastifyReply) => {
    const nearbyGymsQuerySchema = z.object({
        userLatitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })
    
    const { userLatitude, userLongitude } = nearbyGymsQuerySchema.parse(req.body)
    const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase()
    const gyms = await fetchNearbyGymUseCase.execute({ userLatitude, userLongitude })
    
    return res.status(201).send({
        gyms
    })
}