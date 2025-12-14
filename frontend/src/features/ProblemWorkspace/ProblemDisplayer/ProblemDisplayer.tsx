import ReactMarkdown from "react-markdown";
import markdown from './sample.md?raw';

export function ProblemDisplayer() {
  return (
    <div className="bg-card flex overflow-hidden flex-1">
      <div className="flex-1 overflow-auto">
        <div className="markdown-body p-6">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
