import { Submission } from "../../domain/entities/Submission";

export interface ISubmissionRepo {
  save(submission: Submission): Promise<void>;
  findById(id: string): Promise<Submission | null>;
  findAllByStatusBeforeDate(status: string): Promise<Submission[]>;
  findAllTemporaryBeforeDate(date: Date): Promise<Submission[]>;
  deleteById(id: string): Promise<void>;
}