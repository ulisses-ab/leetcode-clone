import express from 'express';
import { ProblemsController } from '../controllers/ProblemsController';
import { Middleware } from '../types.ts/Middleware';

export function createProblemsRoutes(authMiddleware: Middleware, controller: ProblemsController) {
  const router = express.Router();

  router.get('/', 
    controller.listProblems.bind(controller)
  );
  router.get('/:problemId', 
    controller.getProblem.bind(controller)
  );
  router.get('/:problemId/setups/:setupId/tests', 
    controller.getTestsForDisplay.bind(controller)
  );

  router.get('/:problemId/setups/:setupId/submissions',
    authMiddleware,
    controller.getAllSubmissionsForSetup.bind(controller)
  );
  
  router.post('/', 
    authMiddleware,
    controller.createProblem.bind(controller)
  );
  router.post('/:problemId/setups', 
    authMiddleware, 
    controller.addProblemSetup.bind(controller)
  );
  router.post('/:problemId/setups/:setupId/tests', 
    authMiddleware, 
    controller.submitTestsFile.bind(controller)
  );
  router.post('/:problemId/setups/:setupId/runner',
    authMiddleware,
    controller.submitRunnerFile.bind(controller)
  );

  return router;
}