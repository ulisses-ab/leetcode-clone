import { Problem } from "../../domain/entities/Problem";
import { ProblemDTO } from "../dtos/ProblemDTO";
import { mapProblemSetupToDTO } from "./mapProblemSetupToDTO";

export function mapProblemToDTO(problem: Problem): ProblemDTO {
  return {
    id: problem.id,
    title: problem.title,
    statement: problem.statement,
    difficulty: problem.difficulty,
    setups: problem.setups.map(mapProblemSetupToDTO),
    createdAt: problem.createdAt,
    updatedAt: problem.updatedAt,
  };
}