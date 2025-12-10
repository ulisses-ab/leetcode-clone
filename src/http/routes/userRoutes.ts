import express from 'express';
import { UserController } from '../controllers/UserController';
import { Middleware } from '../middleware/Middleware';

export function createSubmissionsRoutes(
  authMiddleware: Middleware, 
  userController: UserController
) {
  const router = express.Router();

  router.get("/me",
    authMiddleware,
    userController.getUser.bind(userController)
  );

  return router;
}