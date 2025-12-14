import { IProblemRepo } from "../../../domain/repos/IProblemRepo";
import { IObjectStorageService } from "../../services/interfaces/IObjectStorageService";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCode";

export type GetTestsForDisplayInput = {
  problemId: string,
  setupId: string,
}

export type GetTestsForDisplayOutput = {
  tests: {
    testcases: unknown[]; 
    [key: string]: unknown;
  };
};

export class GetTestsForDisplayUseCase {
  constructor(
    private readonly problemRepo: IProblemRepo,
    private readonly objectStorageService: IObjectStorageService,
  ) {}

  public async execute(input: GetTestsForDisplayInput): Promise<GetTestsForDisplayOutput> {
    const { problemId, setupId } = input;

    const problem = await this.problemRepo.findById(problemId);

    if (!problem) {
      throw new AppError(ErrorCode.PROBLEM_NOT_FOUND, "Problem not found");
    }

    const setup = problem.setups.find(s => s.id === setupId);

    if (!setup) {
      throw new AppError(ErrorCode.SETUP_NOT_FOUND, "Problem setup not found");
    }

    if (!setup.testsFileKey) {
      throw new AppError(ErrorCode.TESTS_NOT_FOUND, "Tests file not found for this setup");
    }

    const testsFileContent = await this.objectStorageService.download(setup.testsFileKey);

    let testsRaw: any;
    try {
      testsRaw = JSON.parse(testsFileContent.toString());
    } catch {
      throw new AppError(ErrorCode.INVALID_TESTS_FILE, "Tests file is invalid JSON");
    }

    if (!testsRaw || !Array.isArray(testsRaw.testcases)) {
      throw new AppError(ErrorCode.INVALID_TESTS_FILE, "Tests must have a testcases array");
    }

    const maskedTestcases = testsRaw.testcases.map((t: any) => {
      if (t.hidden) {
        return { hidden: true };
      }
      return t;
    });

      
    return { 
      ...testsRaw,
      testcases: maskedTestcases,
    };
  }
}