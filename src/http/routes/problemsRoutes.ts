import express from 'express';
import { ProblemsController } from '../controllers/ProblemsController';
import { SubmissionsController } from '../controllers/SubmissionsController';
import { Middleware } from '../middleware/Middleware';

export function createProblemsRoutes(
  authMiddleware: Middleware, 
  problemsController: ProblemsController, 
  submissionsController: SubmissionsController
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
    problemsController.submitTestsFile.bind(problemsController)
  );
  router.post('/:problemId/setups/:setupId/runner',
    authMiddleware,
    problemsController.submitRunnerFile.bind(problemsController)
  );

  return router;
}