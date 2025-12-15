import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useWorkspaceStore } from "@/features/Workspace/store/store"
import type { NodeApi } from "react-arborist";
import type { FileNode } from "@/features/Workspace/store/types";

interface RowContextMenuProps {
  node: NodeApi<FileNode>;
  children: React.ReactNode; 
}

export function RowContextMenu({ node, children }: RowContextMenuProps) {
  const deleteNode = useWorkspaceStore((state) => state.deleteNode);
  const triggerRename = useWorkspaceStore((state) => state.triggerRename);
  const setActiveFile = useWorkspaceStore((state) => state.setActiveFile);
  const setSelectedNode = useWorkspaceStore((state) => state.setSelectedNode);

  const handleRename = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedNode(node.data.id);
    triggerRename(node.data.id);
    
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56 [&>*]:cursor-pointer">
        { 
          node.isLeaf && 
          <ContextMenuItem onClick={() => setActiveFile(node.data.id)}>
            Open <ContextMenuShortcut>Ctrl+O</ContextMenuShortcut>
          </ContextMenuItem>
        }

        <ContextMenuItem onClick={() => deleteNode(node.data.id)}>
          Delete <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem onClick={handleRename}>
          Rename <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>

      </ContextMenuContent>
    </ContextMenu>
  );
}
