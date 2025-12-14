import { SubmissionDTO } from "../../dtos/SubmissionDTO";
import { ISubmissionRepo } from "../../../domain/repos/ISubmissionRepo";
import { mapSubmissionToDTO } from "../../mappers/mapSubmissionToDTO";

export type GetAllSubmissionsForSetupInput = {
  userId: string,
  setupId: string,
}

export type GetAllSubmissionsForSetupOutput = {
  submissions: SubmissionDTO[],
}

export class GetAllSubmissionsForSetupUseCase {
  constructor(
    private readonly submissionRepo: ISubmissionRepo,
  ) {}

  public async execute(input: GetAllSubmissionsForSetupInput): Promise<GetAllSubmissionsForSetupOutput> {
    const { userId, setupId } = input;

    const submissions = await this.submissionRepo.findAllByUserIdAndSetupId(userId, setupId);

    return {
      submissions: submissions.map(mapSubmissionToDTO)
    };
  }
}