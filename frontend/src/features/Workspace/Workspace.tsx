import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import { FileExplorer } from "./components/FileExplorer/FIleExplorer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useWorkspaceStore } from "./store/store";
import type { FileNode } from "./store/types";
import { useEffect } from "react";
import { useImperativeHandle } from "react";

const sampleNodes: Record<string, FileNode> = {
  "1": { id: "1", name: "root", type: "folder", parentId: null, children: ["2", "3"] },
  "2": { id: "2", name: "src", type: "folder", parentId: "1", children: ["4"] },
  "3": { id: "3", name: "package.json", type: "file", parentId: "1" },
  "4": { id: "4", name: "index.tsx", type: "file", parentId: "2" },
};

export function Workspace({ persistanceKey, zip }: {
  persistanceKey: string,
  zip?: Blob,
}) {
  const initialize = useWorkspaceStore((state) => state.initialize);
  const nodes = useWorkspaceStore((state) => state.nodes);
  const rootId = useWorkspaceStore((state) => state.rootId);

  useEffect(() => {
    initialize(persistanceKey, sampleNodes, "1");
  }, [initialize])


  /* useImperativeHandle(ref, () => ({
    getCurrentZip: () => {
      return zipNodes(nodes, rootId);
    }
  }), [nodes, rootId]); */

  return (
    <ResizablePanelGroup 
      direction="horizontal" 
      className="flex-1 overflow-auto border-none bg-card"
    >
      <ResizablePanel 
        className="min-w-40"
        defaultSize={10}
      >
        <FileExplorer />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="bg-[#121318]"
      >
        <CodeEditor />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}