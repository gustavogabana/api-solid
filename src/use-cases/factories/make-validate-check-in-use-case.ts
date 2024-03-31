import { ValidateCheckInUseCase } from "../validate-check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeValidateCheckInUseCase = () => {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckInUseCase(checkInsRepository)

    return useCase
}