import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Workspace } from "../Workspace/Workspace"
import { ProblemDisplayer } from "./ProblemDisplayer/ProblemDisplayer"

export function ProblemWorkspace() {
  return (
    <ResizablePanelGroup 
      direction="horizontal" 
      className="flex-1 overflow-auto"
    >
      <ResizablePanel 
        className="min-w-40 m-2 mt-0 ml-2 mr-1 rounded-lg  border-1 flex"
        defaultSize={33}
      >
        <ProblemDisplayer />
      </ResizablePanel>
      <ResizableHandle className="invisible"/>
      <ResizablePanel>
        <ResizablePanelGroup 
          direction="vertical" 
          className="flex-1overflow-auto"
        >
          <ResizablePanel className="m-2 mt-0 rounded-lg overflow-hidden ml-1 border-1 mb-1">
            <Workspace persistanceKey="asdhkfj"/>
          </ResizablePanel>
          <ResizableHandle className="invisible"/>
          <ResizablePanel 
            className="min-w-40 m-2 rounded-lg mt-1 ml-1 border-1 flex"
            defaultSize={10}
          >
            <div className="bg-card flex-1 p-4">Console output:</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}