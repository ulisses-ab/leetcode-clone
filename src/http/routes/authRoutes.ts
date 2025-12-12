import express from 'express';
import { AuthController } from '../controllers/AuthController';

export function createAuthRoutes(
  authController: AuthController
) {
  const router = express.Router();

  router.post("/login",
    authController.login.bind(authController)
  );

  router.post("/register",
    authController.register.bind(authController)
  );

  return router;
}