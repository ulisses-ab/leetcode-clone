import { FetchExecutionFilesUseCase } from '../../application/usecases/execution/FetchExecutionFilesUseCase';
import { SubmitExecutionResultsUseCase } from '../../application/usecases/execution/SubmitExecutionResultsUseCase';
import { GetSubmissionUseCase } from '../../application/usecases/submissions/GetSubmissionUseCase';
import { GetSubmissionWithResultsUseCase } from '../../application/usecases/submissions/GetSubmissionWithResultsUseCase'
import { MakeSubmissionUseCase } from '../../application/usecases/submissions/MakeSubmissionUseCase';
import { GetAllSubmissionsForSetupUseCase } from '../../application/usecases/submissions/GetAllSubmissionsForSetupUseCase';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { handleError } from '../errors/handleError';

export class SubmissionsController {
  constructor(
    private makeSubmissionUseCase: MakeSubmissionUseCase,
    private getSubmissionUseCase: GetSubmissionUseCase,
    private fetchExecutionFilesUseCase: FetchExecutionFilesUseCase,
    private submitExecutionResultsUseCase: SubmitExecutionResultsUseCase,
    private getSubmissionWithResultsUseCase: GetSubmissionWithResultsUseCase,
    private getAllSubmissionsForSetupUseCase: GetAllSubmissionsForSetupUseCase,
  ) {}

  public async makeSubmission(req: AuthenticatedRequest, res: Response) {
    const { problemId, setupId } = req.params;
    const { temporary } = req.body;
    const file = req.file;
    const userId = req.user!;

    if(!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
      const output = await this.makeSubmissionUseCase.execute({
        userId,
        problemId,
        setupId,
        fileContent: file.buffer,
        temporary: !!temporary,
      });
    
      return res.status(201).json(output);
    } catch (error) {
      handleError(error, res);
    }
  }

  public async getSubmission(req: AuthenticatedRequest, res: Response) {
    const { submissionId } = req.params;
    const userId = req.user!;
  
    try {
      const output = await this.getSubmissionUseCase.execute({ 
        submissionId,
        userId,
      });

      return res.status(200).json(output);
    } catch (error) {
      handleError(error, res);
    }
  }

  public async fetchExecutionFiles(req: AuthenticatedRequest, res: Response) {
    const { submissionId } = req.params;
    const userId = req.user!;

    try {
      const output = await this.fetchExecutionFilesUseCase.execute({ 
        submissionId,
        userId
      });
      return res.status(200).json(output);
    } catch (error) {
      handleError(error, res);
    }
  }

  public async submitExecutionResults(req: AuthenticatedRequest, res: Response) {
    const { submissionId } = req.params;
    const { status } = req.body;
    const file = req.file;
    const userId = req.user!;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
      const output = await this.submitExecutionResultsUseCase.execute({
        submissionId,
        fileContent: file.buffer,
        userId,
        status,
      });

      return res.status(200).json(output);
    } catch (error) {
      handleError(error, res);
    }   
  }

  public async getSubmissionWithResults(req: AuthenticatedRequest, res: Response) {
    const { submissionId } = req.params;
    const userId = req.user!;

    try {
      const output = await this.getSubmissionWithResultsUseCase.execute({ 
        submissionId,
        userId
      });

      return res.status(200).json(output);
    } catch (error) {
      handleError(error, res);
    } 
  }

  public async getAllSubmissionsForSetup(req: AuthenticatedRequest, res: Response) {
    const { setupId } = req.params;
    const userId = req.user!;

    try {
      const output = await this.getAllSubmissionsForSetupUseCase.execute({ 
        setupId, 
        userId
      });

      return res.status(200).json(output);
    } catch (error) {
      handleError(error, res);
    }
  }
}

