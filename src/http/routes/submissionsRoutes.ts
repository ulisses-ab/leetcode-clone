import express from 'express';
import { SubmissionsController } from '../controllers/SubmissionsController';
import { Middleware } from '../middleware/Middleware';

export function createSubmissionsRoutes(
  authMiddleware: Middleware, 
  submissionsController: SubmissionsController
) {
  const router = express.Router();

  router.post("/:submissionId/files",
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