import type { Problem } from "@/types/Problem";
import { api } from "../api";

export async function fetchProblems(): Promise<Problem[]> {
  const res = await api.get("problems");
  return res.data.problems;
}

export async function fetchProblem(id: string): Promise<Problem | null> {
  const res = await api.get(`/problems/${id}`);
  return res.data.problem;
}