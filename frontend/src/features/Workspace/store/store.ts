import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { WorkspaceState } from "./types";
import { loadWorkspace, setupAutoSave } from "./persistance";
import * as tree from "./tree"

const createWorkspaceStore: StateCreator<WorkspaceState> = (set, get) => ({
  persistanceKey: null,
  nodes: {},
  rootId: null,
  activeFileId: null,
  selectedNodeId: null,
  triggerRenameId: null,

  initialize: (persistanceKey, templateNodes, templateRootId) => {
    const persisted = loadWorkspace(persistanceKey);

    if (persisted) {
      set({
        persistanceKey,
        nodes: persisted.nodes,
        rootId: persisted.rootId,
        activeFileId: persisted.activeFileId,
      });
    } else {
      set({
        persistanceKey,
        nodes: templateNodes,
        rootId: templateRootId,
        activeFileId: null,
      });
    }  
  },
  
  setNodes: (nodes, rootId) => set((state) => {
    const activeFileId = 
      state.activeFileId && (state.activeFileId in nodes) ? 
        state.activeFileId :
        null;

    return {
      nodes,
      rootId,
      activeFileId,
    }
  }),

  setActiveFile: (id) => set({ 
    activeFileId: id 
  }),

  setSelectedNode: (id) => set({ 
    selectedNodeId: id 
  }),

  triggerRename: (id) => set({
    triggerRenameId: id,
  }),

  createFile: (parentId, name) => set((state) => {
    const { nodes, id } = tree.createFile(state.nodes, parentId, name);

    return {
      nodes,
      selectedNodeId: id,
      isRenaming: true,
    }
  }),

  createFolder: (parentId, name) => set((state) => {
    const { nodes, id } = tree.createFolder(state.nodes, parentId, name);

    return {
      nodes,
      selectedNodeId: id,
      isRenaming: true,
    }
  }),

  updateFileContent: (id, content) => set((state) => ({
    nodes: tree.updateFileContent(state.nodes, id, content),
  })),

  moveNode: (id, newParentId) => set((state) => ({
    nodes: tree.moveNode(state.nodes, id, newParentId),
  })),

  renameNode: (id, name) => set((state) => ({
    nodes: tree.renameNode(state.nodes, id, name),
  })),

  deleteNode: (id) => set((state) => {
    const nodes = tree.deleteNode(state.nodes, id);
    const activeFileId = 
      state.activeFileId && (state.activeFileId in nodes) ? 
        state.activeFileId :
        null;

    return {
      nodes,
      activeFileId,
    };
  }),
});

export const useWorkspaceStore = create<WorkspaceState>(createWorkspaceStore);

setupAutoSave(useWorkspaceStore);

