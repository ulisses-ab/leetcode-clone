import { Button } from "@/components/ui/button";
import { FaDownload, FaUpload } from "react-icons/fa";
import { useWorkspaceStore } from "@/features/Workspace/store/store";
import { useRef } from "react";
import { zipToFileNodes, fileNodesToZip } from "@/features/Workspace/utils/zip";
import { downloadFile } from "@/features/Workspace/utils/download";

export function UploadDownload() {
  const nodes = useWorkspaceStore((state) => state.nodes);
  const rootId = useWorkspaceStore((state) => state.rootId);
  const setNodes = useWorkspaceStore((state) => state.setNodes);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const { nodes, rootId } = await zipToFileNodes(file)

      setNodes(nodes, rootId);
    }
  };

  const handleDownload = async () => {
    downloadFile(await fileNodesToZip(nodes, rootId!), "solution.zip");
  };

  return (
    <div className="flex items-center space-x-2 p-2">
      <Button 
        className="flex-1" 
        variant="outline" 
        onClick={handleDownload}
        title="Download Zip"
      >
        <FaDownload />
      </Button>

      <input
        type="file"
        accept=".zip"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Button 
        className="flex-1" 
        variant="outline" 
        onClick={handleUploadClick}
        title="Upload Zip"
      >
        <FaUpload />
      </Button>
    </div>
  );
}