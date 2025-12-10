import { Request, Response, NextFunction } from 'express';
import { IJWTService } from '../../application/services/IJWTService';
import { Middleware } from '../types.ts/Middleware';

export interface AuthenticatedRequest extends Request {
  user?: string;
}

export function createAuthMiddleware(jwtService: IJWTService): Middleware {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization required. Invalid format.' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwtService.verify(token) as { sub: string };
      (req as AuthenticatedRequest).user = decoded.sub;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
}
