import { Language } from "../types/Language";

export type ProblemSetup = {
  id: string,
  problemId: string,
  language: Language,
  info: string,

  runnerId: string,
  testsFileKey: string | null,

  createdAt: Date,
  updatedAt: Date,
}