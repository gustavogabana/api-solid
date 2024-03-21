import { AuthenticateUseCase } from "../authenticate"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"

export const makeAuthenticateUseCase = () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}