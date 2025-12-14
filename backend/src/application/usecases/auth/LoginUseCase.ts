import { UserDTO } from "../../dtos/UserDTO"
import { mapUserToDTO } from "../../mappers/mapUserToDTO"
import { IUserRepo } from "../../../domain/repos/IUserRepo"
import { IJWTService } from "../../services/interfaces/IJWTService"
import { IHashingService } from "../../services/interfaces/IHashingService"
import { AppError } from "../../errors/AppError"
import { ErrorCode } from "../../errors/ErrorCode"

export type LoginInput = {
  identifier: string,
  password: string,
}

export type LoginOutput = {
  token: string,
  user: UserDTO,
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly jwtService: IJWTService,
    private readonly hashingService: IHashingService,
  ) {}

  public async execute(input: LoginInput): Promise<LoginOutput> {
    const { identifier, password } = input;

    const isEmail = identifier.includes("@");

    const user = isEmail ? 
      await this.userRepo.findByEmail(identifier) :
      await this.userRepo.findByHandle(identifier);

    if (!user) {
      throw new AppError(ErrorCode.USER_NOT_FOUND, "User not found");
    }

    const isPasswordValid = await this.hashingService.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError(ErrorCode.INVALID_PASSWORD, "Invalid password");
    }

    const token = this.jwtService.sign(
      { sub: user.id }, 
      60 * 60 * 24 // 24h
    );

    return {
      token,
      user: mapUserToDTO(user)
    }
  }
}

