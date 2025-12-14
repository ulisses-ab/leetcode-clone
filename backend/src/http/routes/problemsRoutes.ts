import express, { RequestHandler } from 'express';
import { ProblemsController } from '../controllers/ProblemsController';
import { SubmissionsController } from '../controllers/SubmissionsController';
import { Multer } from 'multer';

export function createProblemsRoutes(
  authMiddleware: RequestHandler, 
  problemsController: ProblemsController, 
  submissionsController: SubmissionsController,
  upload: Multer,
) {
  const router = express.Router();

  router.get('/', 
    problemsController.listProblems.bind(problemsController)
  );
  router.get('/:problemId', 
    problemsController.getProblem.bind(problemsController)
  );
  router.get('/:problemId/setups/:setupId/tests', 
    problemsController.getTestsForDisplay.bind(problemsController)
  );

  router.post('/:problemId/setups/:setupId/submissions', 
    authMiddleware,
    submissionsController.makeSubmission.bind(submissionsController)
  );
  router.get('/:problemId/setups/:setupId/submissions',
    authMiddleware,
    submissionsController.getAllSubmissionsForSetup.bind(submissionsController)
  );
  
  router.post('/', 
    authMiddleware,
    problemsController.createProblem.bind(problemsController)
  );
  router.post('/:problemId/setups', 
    authMiddleware, 
    problemsController.addProblemSetup.bind(problemsController)
  );
  router.post('/:problemId/setups/:setupId/tests', 
    authMiddleware, 
    upload.single("file"),
    problemsController.submitTestsFile.bind(problemsController)
  );

  return router;
}