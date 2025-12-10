import { Queue } from "bullmq"

import dotenv from "dotenv";
dotenv.config();

export const queue = new Queue("execution-queue", {
  connection: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!)
  }
})