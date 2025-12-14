import { CreateRunnerUseCase } from "../../application/usecases/runners/CreateRunnerUseCase";
import { Request, Response } from 'express';
import { handleError } from "../errors/handleError";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export class RunnersController {
  constructor(
    private createRunnerUseCase: CreateRunnerUseCase,
  ) {}

  public async createRunner(req: AuthenticatedRequest, res: Response) {
    const file = req.file;
    const userId = req.user!;
    const { name, description } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
      const output = await this.createRunnerUseCase.execute({
        userId,
        fileContent: file.buffer,
        name,
        description,
      });

      return res.status(200).json(output);
    } catch (error) {
      handleError(error, res);
    }
  }
}