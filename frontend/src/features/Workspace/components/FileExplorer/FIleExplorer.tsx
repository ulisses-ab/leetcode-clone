import { Tree } from "react-arborist";

import type { FileNode } from "../../store/types";
import { useWorkspaceStore } from "../../store/store";
import { toArboristNodes } from "../../utils/arborist";
import { AddNodeButton } from "./AddNodeButton.tsx/AddNodeButton";
import { UploadDownload } from "./UploadDownload/UploadDownload";
import { Row } from "./Row/Row"

export function FileExplorer() {
  const nodes = useWorkspaceStore((state) => state.nodes);
  const rootId = useWorkspaceStore((state) => state.rootId);
  const setSelectedNode = useWorkspaceStore((state) => state.setSelectedNode);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setSelectedNode(rootId);
  }

  return (
    <div className="h-full select-none text-white border-r border-[#1e1e1e]">
      <UploadDownload />

      <div className="h-8 flex items-center border-t justify-between px-1 py-1 text-xs uppercase tracking-wide text-[#bbbbbb]">
        <span className="pl-2">Explorer</span>
        <div className="flex space-x-1 items-center">
          <AddNodeButton type="file" />
          <AddNodeButton type="folder" />
        </div>
      </div>

      <Tree<FileNode>
        data={toArboristNodes(nodes, rootId!)}
        width="100%"
        onClick={handleClick}
      >
        {({ node, style }) => <Row key={node.id} node={node} style={style} />}
      </Tree>
    </div>
  );
}
