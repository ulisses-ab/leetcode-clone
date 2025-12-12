import express, { RequestHandler } from 'express';
import { SubmissionsController } from '../controllers/SubmissionsController';

export function createSubmissionsRoutes(
  authMiddleware: RequestHandler, 
  submissionsController: SubmissionsController
) {
  const router = express.Router();

  router.post("/:submissionId/execution-files",
    authMiddleware,
    submissionsController.fetchExecutionFiles.bind(submissionsController)
  );

  router.post("/:submissionId/results",
    authMiddleware,
    submissionsController.submitExecutionResults.bind(submissionsController)
  );

  router.get("/:submissionId/results",
    authMiddleware,
    submissionsController.getSubmissionWithResults.bind(submissionsController)
  );

  router.get("/:submissionId",
    authMiddleware,
    submissionsController.getSubmission.bind(submissionsController)
  );

  return router;
}