import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"

// factory pattern = abstrair a criação de objetos sem expor a lógica de criação beneficiando a reutilização

export const makeGetUserProfileUseCase = () => {
    const usersRepository = new InMemoryUsersRepository()
    const useCase = new GetUserProfileUseCase(usersRepository)

    return useCase
}