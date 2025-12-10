import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { Middleware } from '../middleware/Middleware';

export function createSubmissionsRoutes(
  authMiddleware: Middleware, 
  authController: AuthController
) {
  const router = express.Router();

  router.post("/login",
    authMiddleware,
    authController.login.bind(authController)
  );

  router.post("/register",
    authMiddleware,
    authController.register.bind(authController)
  );

  return router;
}