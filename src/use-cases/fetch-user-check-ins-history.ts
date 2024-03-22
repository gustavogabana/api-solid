import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUserCaseRequest {
    userId: string
}

interface FetchUserCheckInsHistoryUserCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({ userId }: FetchUserCheckInsHistoryUserCaseRequest): Promise<FetchUserCheckInsHistoryUserCaseResponse> {
        const checkIns: CheckIn[] = await this.checkInsRepository.findManyByUserId(userId)

        return { checkIns }
    }

}