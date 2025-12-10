import express from 'express';
import { UsersController } from '../controllers/UsersController';
import { Middleware } from '../middleware/Middleware';

export function createUsersRoutes(
  authMiddleware: Middleware, 
  userController: UsersController
) {
  const router = express.Router();

  router.get("/me",
    authMiddleware,
    userController.getUser.bind(userController)
  );

  return router;
}