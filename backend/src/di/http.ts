import multer from "multer";

import {
  oAuthCallbackUseCase,
  fetchExecutionFilesUseCase,
  submitExecutionResultsUseCase,
  addProblemSetupUseCase,
  createProblemUseCase,
  getProblemUseCase,
  getTestsForDisplayUseCase,
  listProblemsUseCase,
  submitTestsFileUseCase,
  makeSubmissionUseCase,
  getSubmissionUseCase,
  getSubmissionWithResultsUseCase,
  getAllSubmissionsForSetupUseCase,
  getUserUseCase,
  createRunnerUseCase,
} from "./application";

import { jwtService } from "./infra"

import { AuthController } from "../http/controllers/AuthController"
import { ProblemsController } from "../http/controllers/ProblemsController"
import { SubmissionsController } from "../http/controllers/SubmissionsController"
import { UsersController } from "../http/controllers/UsersController"
import { RunnersController } from "../http/controllers/RunnersController";

import { createAuthMiddleware } from "../http/middleware/authMiddleware";

import { createSubmissionsRoutes } from "../http/routes/submissionsRoutes"
import { createAuthRoutes } from "../http/routes/authRoutes"
import { createProblemsRoutes } from "../http/routes/problemsRoutes"
import { createUsersRoutes } from "../http/routes/usersRoutes"
import { createRunnersRoutes } from "../http/routes/runnersRoutes";

import { googleOAuthClient } from "./infra";

import dotenv from "dotenv";
dotenv.config();

export const authController = new AuthController(
  oAuthCallbackUseCase,
  googleOAuthClient,
  process.env.FRONTEND_OAUTH_REDIRECT_URL!
);

export const problemsController = new ProblemsController(
  createProblemUseCase, 
  getProblemUseCase, 
  listProblemsUseCase, 
  addProblemSetupUseCase,
  getTestsForDisplayUseCase,
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

export const usersController = new UsersController(
  getUserUseCase
);

export const runnersController = new RunnersController(
  createRunnerUseCase
);

export const authMiddleware = createAuthMiddleware(jwtService);

export const upload = multer();

export const problemsRoutes = createProblemsRoutes(
  authMiddleware, 
  problemsController, 
  submissionsController,
  upload,
);

export const submissionsRoutes = createSubmissionsRoutes(
  authMiddleware,
  submissionsController
);

export const usersRoutes = createUsersRoutes(
  authMiddleware,
  usersController
);

export const authRoutes = createAuthRoutes(
  authController
);

export const runnersRoutes = createRunnersRoutes(
  authMiddleware,
  runnersController,
  upload,
);