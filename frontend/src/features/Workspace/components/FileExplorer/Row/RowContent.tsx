import { ChevronRight, ChevronDown } from "lucide-react";
import { VSCodeIcon } from "./VSCodeIcon";
import { NodeApi } from "react-arborist";
import { useWorkspaceStore } from "../../../store/store";
import type { FileNode } from "../../../store/types";
import { RowText } from "./RowText";

export function RowContent({ node, style }: { 
  node: NodeApi<FileNode>; 
  style: any, 
}) {
  const setActiveFile = useWorkspaceStore((state) => state.setActiveFile);
  const setSelectedNode = useWorkspaceStore((state) => state.setSelectedNode);
  const isSelected = useWorkspaceStore((state) => state.selectedNodeId === node.data.id);

  const isFolder = node.isInternal;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setSelectedNode(node.data.id);

    if (isFolder) {
      node.toggle();
    } else {
      node.select();
      setActiveFile(node.data.id);
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedNode(node.data.id);
  };

  return (
    <div
      style={{
        ...style,
        paddingLeft: style.paddingLeft*0.8 + 6,
      }}
      className={`flex items-center gap-1 h-6 text-sm cursor-pointer
        ${isSelected ? "bg-[#094771] border-y" : "hover:bg-[#2a2d2e]"}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
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


      <RowText nodeId={node.data.id} />
    </div>
  );
}