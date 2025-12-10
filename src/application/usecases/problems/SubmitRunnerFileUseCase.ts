import { IProblemRepo } from "../../../domain/repos/IProblemRepo";
import { IObjectStorageService } from "../../services/interfaces/IObjectStorageService";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCode";
import { assertUserIsRole } from "../../helpers/assertUserIsRole";
import { IUserRepo } from "../../../domain/repos/IUserRepo";

import { Role } from "../../../domain/types/Role";

export type SubmitRunnerFileInput = {
  userId: string,
  problemId: string,
  setupId: string,
  fileContent: Buffer,
}

export type SubmitRunnerFileOutput = void;

export class SubmitRunnerFileUseCase {
  constructor(
    private problemRepo: IProblemRepo,
    private userRepo: IUserRepo,
    private objectStorageService: IObjectStorageService,
  ) {}

  public async execute(input: SubmitRunnerFileInput): Promise<SubmitRunnerFileOutput> {
    const { userId, problemId, setupId, fileContent } = input;

    await assertUserIsRole(userId, Role.ADMIN, this.userRepo);

    const problem = await this.problemRepo.findById(problemId);

    if (!problem) {
      throw new AppError(ErrorCode.PROBLEM_NOT_FOUND, "Problem not found");
    }

    const setup = problem.setups.find(s => s.id === setupId);

    if (!setup) {
      throw new AppError(ErrorCode.SETUP_NOT_FOUND, "Problem setup not found");
    }

    const runnerFileKey = `problems/${problemId}/setups/${setupId}/runner`;

    await this.objectStorageService.upload(runnerFileKey, fileContent);

    setup.runnerFileKey = runnerFileKey;
    setup.updatedAt = new Date();

    try {
      await this.problemRepo.save(problem);
    } catch (error) {
      await this.objectStorageService.delete(runnerFileKey);
      throw error;
    }
  }
}





