import { TbFolderPlus } from "react-icons/tb";
import { useWorkspaceStore } from "../../store/store";

export function AddFolderButton() {
  const nodes = useWorkspaceStore((state) => state.nodes);
  const rootId = useWorkspaceStore((state) => state.rootId);
  const selectedNodeId = useWorkspaceStore((state) => state.selectedNodeId);
  const createFolder = useWorkspaceStore((state) => state.createFolder);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log(selectedNodeId);

    const selectedNode = 
      selectedNodeId ?
        nodes[selectedNodeId] :
        nodes[rootId!];

    const parentId = 
      selectedNode.type === "folder" ?
        selectedNode.id :
        selectedNode.parentId;

    createFolder(parentId!, "aura");

    console.log("aura");
  };

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-1 text-xs text-[#bbbbbb] hover:bg-[#2a2d2e] rounded"
      title="Add new folder"
    >
      <TbFolderPlus size={18} />
    </button>
  );
}
