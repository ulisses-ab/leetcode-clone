import { Difficulty } from "../types/Difficulty"
import { ProblemSetup } from "./ProblemSetup"

export type Problem = {
  id: string,
  title: string,
  statement: string, 
  difficulty: Difficulty,

  setups: ProblemSetup[],

  creatorId: string,
  
  createdAt: Date,
  updatedAt: Date,
}