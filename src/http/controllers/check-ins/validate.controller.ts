import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

export const validate = async (req: FastifyRequest, res: FastifyReply) => {
    const validateCheckInsParamsSchema = z.object({
        checkInId: z.string().uuid()
    })
    
    const { checkInId } = validateCheckInsParamsSchema.parse(req.params)
    
    const validateCheckInUseCase = makeValidateCheckInUseCase()
    await validateCheckInUseCase.execute({ checkInId })
    
    return res.status(204).send()
}