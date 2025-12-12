import { IProblemRepo } from "../../../domain/repos/IProblemRepo";
import { ISubmissionRepo } from "../../../domain/repos/ISubmissionRepo";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCode";
import { assertUserIsRole } from "../../helpers/assertUserIsRole";
import { Role } from "../../../domain/types/Role";
import { IUserRepo } from "../../../domain/repos/IUserRepo";
import { mapSubmissionToDTO } from "../../mappers/mapSubmissionToDTO";
import { SubmissionDTO } from "../../dtos/SubmissionDTO";
import { IRunnerRepo } from "../../../domain/repos/IRunnerRepo";

export type FetchExecutionFilesInput = {
  userId: string;
  submissionId: string;
}

export type FetchExecutionFilesOutput = {
  submission: SubmissionDTO;
  codeFileKey: string;
  runnerFileKey: string;
  testsFileKey: string;
}

export class FetchExecutionFilesUseCase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly submissionRepo: ISubmissionRepo,
    private readonly problemRepo: IProblemRepo,
    private readonly runnerRepo: IRunnerRepo,
  ) {}

  public async execute(input: FetchExecutionFilesInput): Promise<FetchExecutionFilesOutput> {
    const { userId, submissionId } = input;

    await assertUserIsRole(userId, Role.EXECUTION_ENGINE, this.userRepo);

    const submission = await this.submissionRepo.findById(submissionId);
    if (!submission) {
      throw new AppError(ErrorCode.SUBMISSION_NOT_FOUND, "Submission not found");
    }

    const problem = await this.problemRepo.findById(submission.problemId);
    if (!problem) {
      throw new AppError(ErrorCode.PROBLEM_NOT_FOUND, "Problem not found");
    }

    const setup = problem.setups.find(s => s.id === submission.setupId);
    if (!setup) {
      throw new AppError(ErrorCode.SETUP_NOT_FOUND, "Problem setup not found");
    }

    const runner = await this.runnerRepo.findById(setup.runnerId);
    if (!runner) {
      throw new AppError(ErrorCode.RUNNER_NOT_FOUND, "Runner not found");
    }

    if (!setup.testsFileKey) {
      throw new AppError(ErrorCode.SETUP_INCOMPLETE, "Problem setup is incomplete");
    }

    return {
      submission: mapSubmissionToDTO(submission),
      codeFileKey: submission.codeFileKey,
      runnerFileKey: runner.runnerFileKey,
      testsFileKey: setup.testsFileKey,
    }
  }
}