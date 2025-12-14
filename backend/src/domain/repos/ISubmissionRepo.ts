import { Submission } from "../../domain/entities/Submission";

export interface ISubmissionRepo {
  save(submission: Submission): Promise<void>;

  findById(id: string): Promise<Submission | null>;
  findAllByUserId(userId: string): Promise<Submission[]>;
  findAllByUserIdAndSetupId(userId: string, setupId: string): Promise<Submission[]>;

  findAllByStatusBeforeDate(status: string, date: Date): Promise<Submission[]>;
  findAllTemporaryBeforeDate(date: Date): Promise<Submission[]>;

  deleteById(id: string): Promise<void>;
}