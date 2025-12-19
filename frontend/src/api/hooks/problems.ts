import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { fetchProblem, fetchProblems } from "../fetch/problems";

export function useProblem(problemId: string | null) {
  return useQuery({
    queryKey: ["problem", problemId],
    queryFn: () => fetchProblem(problemId!),
    enabled: !!problemId,
  });
}

export function useProblems() {
  return useQuery({
    queryKey: ["problem"],
    queryFn: fetchProblems,
  });
}