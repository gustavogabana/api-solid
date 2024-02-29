import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

export const registerUseCase = async ({
    name, email, password
}: RegisterUseCaseRequest) => {
    const password_hash = await hash(password, 6)

    const userWithTheSameEmail = await prisma.user.findUnique({where: {email}})

    if (userWithTheSameEmail) {
        throw new Error('E-mail already exists.')
    }
    
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })
}