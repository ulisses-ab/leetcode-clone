import { RowContent } from "./RowContent";
import { NodeApi } from "react-arborist";
import type { FileNode } from "@/features/Workspace/store/types";
import { RowContextMenu } from "./RowContextMenu";

export function Row({ node, style }: { 
  node: NodeApi<FileNode>; 
  style: any, 
}) {
  return (
    <RowContextMenu node={node} >
      <RowContent node={node} style={style} />
    </RowContextMenu>
  )
}