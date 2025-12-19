import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useProblem } from "@/api/hooks/problems"
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { useNavbarStore } from "@/stores/useNavbarStore";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Workspace({ problemId }: { problemId: string }) {
  const { data: problem } = useProblem(problemId);
  const setNavbarCenter = useNavbarStore((state) => state.setNavbarCenter);
  
  useEffect(() => {
    setNavbarCenter(
      <div className="flex space-x-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">C++</SelectItem>
            <SelectItem value="dark">Java</SelectItem>
            <SelectItem value="system">JavaScript</SelectItem>
          </SelectContent>
        </Select>
        <div className="bg-gray-700 rounded-lg px-2 py-1">Run</div>
        <div className="bg-green-600 rounded-lg px-2 py-1">Submit</div>
      </div>
    )
  }, [])

  return (
    <ResizablePanelGroup 
      direction="horizontal" 
      className="flex-1"
    >
      <ResizablePanel 
        className="min-w-40 m-2 mt-0 ml-2 mr-1 rounded-lg flex"
        defaultSize={33}
      >
        <LeftSide problem={problem ?? undefined} />
      </ResizablePanel>
      <ResizableHandle className="bg-transparent"/>
      <ResizablePanel 
        className="min-w-40 m-2 mt-0 mr-2 ml-1 flex rounded-lg"
      >
        <RightSide setupId={"aura"} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}