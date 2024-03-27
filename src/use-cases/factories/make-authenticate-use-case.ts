import { AuthenticateUseCase } from "../authenticate"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeAuthenticateUseCase = () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}