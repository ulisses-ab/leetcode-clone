import { IRunnerRepo } from "../../../domain/repos/IRunnerRepo"
import { Runner } from "../../../domain/entities/Runner"
import { IUUIDService } from "../../services/interfaces/IUUIDService"
import { RunnerDTO } from "../../dtos/RunnerDTO"
import { IUserRepo } from "../../../domain/repos/IUserRepo"
import { assertUserIsRole } from "../../helpers/assertUserIsRole"
import { Role } from "../../../domain/types/Role"
import { IObjectStorageService } from "../../services/interfaces/IObjectStorageService"
import { mapRunnerToDTO } from "../../mappers/mapRunnerToDTO"

export type CreateRunnerInput = {
  userId: string,
  name?: string,
  description?: string,
  fileContent: Buffer,
}

export type CreateRunnerOutput = {
  runner: RunnerDTO
}

export class CreateRunnerUseCase {
  constructor(
    private readonly runnerRepo: IRunnerRepo,
    private readonly uuidService: IUUIDService,
    private readonly userRepo: IUserRepo,
    private readonly objectStorageService: IObjectStorageService,
  ) {}

  public async execute(input: CreateRunnerInput): Promise<CreateRunnerOutput> {
    const { userId, name, description, fileContent } = input;

    await assertUserIsRole(userId, Role.ADMIN, this.userRepo);

    const id = this.uuidService.generate();

    const runnerFileKey = `runners/${id}`;

    await this.objectStorageService.upload(runnerFileKey, fileContent);

    const runner: Runner = {
      id,
      name: name || "",
      description: description || "",
      runnerFileKey,
      createdAt: new Date(),
    }

    try {
      await this.runnerRepo.save(runner);
    }
    catch (error) {
      await this.objectStorageService.delete(runnerFileKey);
      throw error;
    }

    return {
      runner: mapRunnerToDTO(runner)
    }
  }
}