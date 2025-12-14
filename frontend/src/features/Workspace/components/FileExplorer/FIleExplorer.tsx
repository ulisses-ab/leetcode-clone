import { Tree, NodeApi } from "react-arborist";
import { ChevronRight, ChevronDown } from "lucide-react";
import { VSCodeIcon } from "./VSCodeIcon";
import type { FileNode } from "../../store/types";
import { useWorkspaceStore } from "../../store/store";
import { toArboristNodes } from "../../utils/arborist";
import { Plus, FilePlus, FolderPlus } from "lucide-react"
import { AddFileButton } from "./AddFileButton";
import { AddFolderButton } from "./AddFolderButton";
import { UploadDownload } from "./UploadDownload/UploadDownload";

function Row({ node, style }: { 
  node: NodeApi<FileNode>; 
  style: any, 
}) {
  const setActiveFile = useWorkspaceStore((state) => state.setActiveFile);
  const activeFileId = useWorkspaceStore((state) => state.activeFileId);
  const setSelectedNode = useWorkspaceStore((state) => state.setSelectedNode);
  const selectedNodeId = useWorkspaceStore((state) => state.selectedNodeId);

  const isFolder = node.isInternal;

  const handleClick = () => {
    setSelectedNode(node.data.id);

    if (isFolder) {
      node.toggle();
    } else {
      node.select();
      setActiveFile(node.data.id);
    }
  };

  return (
    <div
      style={{
        ...style,
        paddingLeft: style.paddingLeft*0.8 + 6,
      }}
      className={`flex items-center gap-1 h-6 text-sm cursor-pointer
        ${node.isSelected ? "bg-[#094771] border-y" : "hover:bg-[#2a2d2e]"}`}
      onClick={handleClick}
    >
      {isFolder ? (
        node.isOpen ? (
          <ChevronDown size={14} className="text-[#c5c5c5]" />
        ) : (
          <ChevronRight size={14} className="text-[#c5c5c5]" />
        )
      ) : (
        <VSCodeIcon name={node.data.name} isFolder={false} />
      )}

      <span className="truncate text-[#cccccc]">{node.data.name}</span>
    </div>
  );
}

export function FileExplorer() {
  const nodes = useWorkspaceStore((state) => state.nodes);
  const rootId = useWorkspaceStore((state) => state.rootId);

  return (
    <div className="h-full select-none text-white border-r border-[#1e1e1e]">
      <UploadDownload />

      <div className="h-8 flex items-center border-t justify-between px-1 py-1 text-xs uppercase tracking-wide text-[#bbbbbb]">
        <span className="pl-2">Explorer</span>
        <div className="flex space-x-1 items-center">
          <AddFileButton />
          <AddFolderButton />
        </div>
      </div>

      <Tree<FileNode>
        data={toArboristNodes(nodes, rootId!)}
        width="100%"
      >
        {({ node, style }) => <Row key={node.id} node={node} style={style} />}
      </Tree>
    </div>
  );
}
