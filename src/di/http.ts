import {
  loginUsecase,
  registerUseCase,
  fetchExecutionFilesUseCase,
  submitExecutionResultsUseCase,
  addProblemSetupUseCase,
  createProblemUseCase,
  getProblemUseCase,
  getTestsForDisplayUseCase,
  listProblemsUseCase,
  submitRunnerFileUseCase,
  submitTestsFileUseCase,
  makeSubmissionUseCase,
  getSubmissionUseCase,
  getSubmissionWithResultsUseCase,
  getAllSubmissionsForSetupUseCase,
  getUserUseCase,
} from "./application";

import { jwtService } from "./infra"

import { AuthController } from "../http/controllers/AuthController"
import { ProblemsController } from "../http/controllers/ProblemsController"
import { SubmissionsController } from "../http/controllers/SubmissionsController"
import { UsersController } from "../http/controllers/UsersController"

import { createAuthMiddleware } from "../http/middleware/authMiddleware";

import { createSubmissionsRoutes } from "../http/routes/submissionsRoutes"
import { createAuthRoutes } from "../http/routes/authRoutes"
import { createProblemsRoutes } from "../http/routes/problemsRoutes"
import { createUsersRoutes } from "../http/routes/usersRoutes"

export const authController = new AuthController(
  loginUsecase, 
  registerUseCase
);

export const problemsController = new ProblemsController(
  createProblemUseCase, 
  getProblemUseCase, 
  listProblemsUseCase, 
  addProblemSetupUseCase,
  getTestsForDisplayUseCase,
  submitRunnerFileUseCase,
  submitTestsFileUseCase
);

export const submissionsController = new SubmissionsController(
  makeSubmissionUseCase,
  getSubmissionUseCase,
  fetchExecutionFilesUseCase,
  submitExecutionResultsUseCase,
  getSubmissionWithResultsUseCase,
  getAllSubmissionsForSetupUseCase
);

export const userController = new UsersController(
  getUserUseCase
);

export const authMiddleware = createAuthMiddleware(jwtService);

export const problemsRoutes = createProblemsRoutes(
  authMiddleware, 
  problemsController, 
  submissionsController
);

export const submissionsRoutes = createSubmissionsRoutes(
  authMiddleware,
  submissionsController
);

export const usersRoutes = createUsersRoutes(
  authMiddleware,
  userController
);

export const authRoutes = createAuthRoutes(
  authController
)
