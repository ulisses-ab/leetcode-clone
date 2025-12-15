export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  parentId: string | null;
  children?: string[];
  content?: string;
};

export type PersistedWorkspace = {
  nodes: Record<string, FileNode>;
  persistanceKey: string | null;
  rootId: string | null;
  activeFileId: string | null;
};

export type WorkspaceState = {
  persistanceKey: string | null;

  nodes: Record<string, FileNode>;
  rootId: string | null;
  activeFileId: string | null;
  selectedNodeId: string | null;
  triggerRenameId: string | null;

  initialize: (
    persistanceKey: string,
    nodes: Record<string, FileNode>,
    rootId: string
  ) => void;

  setNodes: (nodes: Record<string, FileNode>, rootId: string) => void;
  setActiveFile: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  triggerRename: (id: string | null) => void;
  createFile: (parentId: string, name: string) => void;
  createFolder: (parentId: string, name: string) => void;
  updateFileContent: (id: string, content: string) => void;
  moveNode: (id: string, newParentId: string) => void;
  renameNode: (id: string, name: string) => void;
  deleteNode: (id: string) => void;
};