import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useProblems } from "@/api/hooks/problems";
import type { Problem } from "@/types/Problem";
import { Link } from "react-router-dom";

export function ProblemList() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<Problem["difficulty"] | "All">("All");
  const { data: problems } = useProblems();

  const filteredProblems = useMemo(() => {
    if (!problems) return [];

    console.log(problems);

    return problems.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === "All" || p.difficulty === difficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty, problems]);

  return (
    <div className="space-y-4 w-full max-w-5xl">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <Input
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <Label htmlFor="difficulty">Difficulty:</Label>
          <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Problem["difficulty"] | "All")}>
            <SelectTrigger id="difficulty" className="w-32">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Problems List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((problem) => (
          <Link to={`/problems/${problem.id}`}>
            <Card key={problem.id} className="cursor-pointer">
              <CardHeader>
                <CardTitle>{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Difficulty: {problem.difficulty}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredProblems.length === 0 && <p className="text-muted-foreground">No problems found.</p>}
      </div>
    </div>
  );
}
