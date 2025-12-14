import { LoginUseCase } from '../../application/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../application/usecases/auth/RegisterUseCase';
import { Request, Response } from 'express';
import { handleError } from '../errors/handleError';

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
  ) {}

  public async login(req: Request, res: Response) {
    const { identifier, password } = req.body;

    try {
      const output = await this.loginUseCase.execute({
        identifier,
        password
      });

      return res.status(201).json(output);
    } catch (error) {
      handleError(error, res);
    }
  }

  public async register(req: Request, res: Response) {
    const { email, handle, password } = req.body;

    try {
      const output = await this.registerUseCase.execute({ 
        email,
        handle,
        password 
      });

      return res.status(200).json(output);
    } catch (error) {
      handleError(error, res);
    }
  }
}
