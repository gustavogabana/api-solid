import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";

interface GetUserMetricsUserCaseRequest {
    userId: string
}

interface GetUserMetricsUserCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({ userId }: GetUserMetricsUserCaseRequest): Promise<GetUserMetricsUserCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)
        return { checkInsCount }
    }

}