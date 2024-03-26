import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUserCaseRequest {
    userId: string,
    page: number
}

interface FetchUserCheckInsHistoryUserCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({ userId, page }: FetchUserCheckInsHistoryUserCaseRequest): Promise<FetchUserCheckInsHistoryUserCaseResponse> {
        const checkIns: CheckIn[] = await this.checkInsRepository.findManyByUserId(userId, page)

        return { checkIns }
    }

}