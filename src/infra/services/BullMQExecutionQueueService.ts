import { Queue } from "bullmq";
import { IExecutionQueueService } from "../../application/services/IExecutionQueueService";

import dotenv from "dotenv";
dotenv.config();

export class ExecutionQueueService implements IExecutionQueueService {
  private queue: Queue;

  constructor(queueName: string, redisUrl: string) {
    this.queue = new Queue(queueName, {
      connection: {
        host: redisUrl, // ou use url completa tipo "redis://localhost:6379"
      },
    });
  }

  async enqueue(submissionId: string): Promise<void> {
    await this.queue.add("execute-submission", { submissionId });
  }
}
submission", { submissionId });
  }
}
