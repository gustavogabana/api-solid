import { makeUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export const metrics = async (req: FastifyRequest, res: FastifyReply) => {
    
    const userMetricsUseCase = makeUserMetricsUseCase()
    const { checkInsCount } = await userMetricsUseCase.execute({ userId: req.user.sub })
    
    return res.status(201).send({
        checkInsCount
    })
}