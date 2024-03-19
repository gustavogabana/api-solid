import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"

export const register = async (req: FastifyRequest, res: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })
    
    const { name, email, password } = registerBodySchema.parse(req.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({name, email, password})
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).send({message: error.message})
        }

        throw error
    }
    
    return res.status(201).send()
}