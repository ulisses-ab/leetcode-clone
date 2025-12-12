import { PrismaClient } from "../../generated/prisma/client";
import { IRunnerRepo } from "../../domain/repos/IRunnerRepo";
import { Runner } from "../../domain/entities/Runner";

export class PrismaRunnerRepo implements IRunnerRepo {
  constructor(private prisma: PrismaClient) {}

  async save(runner: Runner): Promise<void> {
    await this.prisma.runner.upsert({
      where: { id: runner.id },
      update: {
        name: runner.name,
        description: runner.description,
        runnerFileKey: runner.runnerFileKey,
        createdAt: runner.createdAt,
      },
      create: {
        id: runner.id,
        name: runner.name,
        description: runner.description,
        runnerFileKey: runner.runnerFileKey,
        createdAt: runner.createdAt,
      },
    });
  }

  async findById(id: string): Promise<Runner | null> {
    const runner = await this.prisma.runner.findUnique({
      where: { id },
    });
    return runner ? this.map(runner) : null;
  }

  private map = (r: any): Runner => ({
    id: r.id,
    name: r.name,
    description: r.description,
    runnerFileKey: r.runnerFileKey,
    createdAt: r.createdAt,
  });
}