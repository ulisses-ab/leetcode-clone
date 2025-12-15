import { TbFolderPlus, TbFilePlus } from "react-icons/tb";
import { useWorkspaceStore } from "../../../store/store";

export function AddNodeButton({ type }: { type: "folder" | "file" }) {
  const nodes = useWorkspaceStore((state) => state.nodes);
  const rootId = useWorkspaceStore((state) => state.rootId);
  const selectedNodeId = useWorkspaceStore((state) => state.selectedNodeId);
  const createFolder = useWorkspaceStore((state) => state.createFolder);
  const createFile = useWorkspaceStore((state) => state.createFile);


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

    type === "file" ?
      createFile(parentId!, "") :
      createFolder(parentId!, "")
  };

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-1 text-xs text-[#bbbbbb] hover:bg-[#2a2d2e] rounded"
      title="Add new folder"
    >
      {type === "file" ? (
        <TbFilePlus size={18} />
      ) : (
        <TbFolderPlus size={18} />
      )}

    </button>
  );
}
