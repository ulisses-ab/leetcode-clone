import { User } from "../../../domain/entities/User"
import { UserDTO } from "../../dtos/UserDTO"
import { mapUserToDTO } from "../../mappers/mapUserToDTO"
import { IUserRepo } from "../../../domain/repos/IUserRepo"
import { IJWTService } from "../../services/interfaces/IJWTService"
import { IHashingService } from "../../services/interfaces/IHashingService"
import { IUUIDService } from "../../services/interfaces/IUUIDService" 
import { AppError } from "../../errors/AppError"
import { ErrorCode } from "../../errors/ErrorCode"
import { Role } from "../../../domain/types/Role"

export type RegisterInput = {
  handle: string,
  email: string,
  password: string,
}

export type RegisterOutput = {
  token: string,
  user: UserDTO,
}

export class RegisterUseCase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly jwtService: IJWTService,
    private readonly hashingService: IHashingService,
    private readonly uuidService: IUUIDService,
  ) {}

  public async execute(input: RegisterInput): Promise<RegisterOutput> {
    const { handle, email, password } = input;
    
    const handleExists = await this.userRepo.findByHandle(handle);
    if (handleExists) {
      throw new AppError(ErrorCode.HANDLE_ALREADY_IN_USE, "Handle already in use");
    }

    const emailExists = await this.userRepo.findByEmail(email);
    if (emailExists) {
      throw new AppError(ErrorCode.EMAIL_ALREADY_IN_USE, "Email already in use");
    }

    const hashedPassword = await this.hashingService.hash(password);

    const user: User = {
      id: this.uuidService.generate(),
      handle,
      email,
      passwordHash: hashedPassword,
      role: Role.REGULAR,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.userRepo.save(user);

    const token = this.jwtService.sign(
      { userId: user.id },
      60 * 60 * 24 // 24h
    );

    return {
      token,
      user: mapUserToDTO(user),
    };
  }
}