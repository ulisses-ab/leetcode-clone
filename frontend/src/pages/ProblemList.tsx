import { Navbar } from "@/components/layout/Navbar/Navbar"
import { ProblemWorkspace } from "@/features/ProblemWorkspace/ProblemWorkspace"

export function ProblemList() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <ProblemWorkspace />
    </ div>
  )
}