import type { Problem } from "@/types/Problem";
import ReactMarkdown from "react-markdown";

export function ProblemDisplayer({ problem }: { problem?: Problem }) {
  return (
    <div className="markdown-body bg-card flex-1 p-6">
      <ReactMarkdown >{problem?.statement}</ReactMarkdown>
    </div>
  )
}