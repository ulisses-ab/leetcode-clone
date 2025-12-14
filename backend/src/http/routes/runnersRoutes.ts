import express, { RequestHandler } from 'express';
import { RunnersController } from '../controllers/RunnersController';
import { Multer  } from 'multer';

export function createRunnersRoutes(
  authMiddleware: RequestHandler, 
  runnersController: RunnersController,
  upload: Multer,
) {
  const router = express.Router();

  router.post("/",
    authMiddleware,
    upload.single("file"),
    runnersController.createRunner.bind(runnersController)
  );

  return router;
}