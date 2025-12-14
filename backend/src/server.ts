import express from "express"
import { json } from "body-parser";
import path from "path";

import { problemsRoutes, authRoutes, usersRoutes, submissionsRoutes, runnersRoutes } from "./di/http"
import { submissionTimeoutService, temporarySubmissionCleanupService } from "./di/application"

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT!;

const TEMPORARY_SUBMISSION_EXPIRATION_MS = 1000*60*5;
const SUBMISSION_TIMEOUT_MS = 1000*30;
const SERVICE_EXECUTION_INTERVAL_MS = 1000*10;

async function bootstrap() {
  const app = express();

  app.use(json());

  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.use("/api/problems", problemsRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/submissions", submissionsRoutes);
  app.use("/api/runners", runnersRoutes);

  setInterval(async () => {
    try {
      const promises = [
        temporarySubmissionCleanupService.cleanupTemporarySubmissions(TEMPORARY_SUBMISSION_EXPIRATION_MS),
        submissionTimeoutService.markTimedOutSubmissions(SUBMISSION_TIMEOUT_MS),
      ];

      await Promise.all(promises);
    }
    catch (error) {
      console.error("Service error: ", error);
    }
  }, SERVICE_EXECUTION_INTERVAL_MS);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

bootstrap();
