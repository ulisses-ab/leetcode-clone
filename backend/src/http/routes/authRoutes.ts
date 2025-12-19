import express from 'express';
import { AuthController } from '../controllers/AuthController';

export function createAuthRoutes(
  authController: AuthController
) {
  const router = express.Router();

  router.get("/google",
    authController.google.bind(authController)
  );

  router.get("/google/callback",
    authController.googleCallback.bind(authController)
  );

  return router;
}