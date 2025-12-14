import { prisma } from "./clients/prisma"
import { queue } from "./clients/bullmq"
import { s3 } from "./clients/s3"

import { PrismaProblemRepo } from "../infra/prisma/PrismaProblemRepo";
import { PrismaSubmissionRepo } from "../infra/prisma/PrismaSubmissionRepo";
import { PrismaUserRepo } from "../infra/prisma/PrismaUserRepo";

import { BullMQExecutionQueueService } from "../infra/services/BullMQExecutionQueueService";
import { BcryptHashingService } from "../infra/services/BcryptHashingService";
import { JWTService } from "../infra/services/JWTService";
import { S3ObjectStorageService } from "../infra/services/S3ObjectStorageService";
import { UUIDService } from "../infra/services/UUIDService";

import dotenv from "dotenv";
import { PrismaRunnerRepo } from "../infra/prisma/PrismaRunnerRepo";
dotenv.config();

export const prismaProblemRepo = new PrismaProblemRepo(prisma);
export const prismaSubmissionRepo = new PrismaSubmissionRepo(prisma);
export const prismaUserRepo = new PrismaUserRepo(prisma);
export const prismaRunnerRepo = new PrismaRunnerRepo(prisma);

export const bullMqExecutionQueueService = new BullMQExecutionQueueService(queue);
export const bcryptHashingService = new BcryptHashingService(10);
export const jwtService = new JWTService(process.env.JWT_SECRET!);
export const s3ObjectStorageService = new S3ObjectStorageService(s3, process.env.S3_BUCKET_NAME!);
export const uuidService = new UUIDService();
