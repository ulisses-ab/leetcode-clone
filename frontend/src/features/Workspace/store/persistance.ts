import type { PersistedWorkspace, WorkspaceState } from "./types";
import { debounce } from "lodash"
import type { StoreApi } from "zustand";

const AUTOSAVE_DELAY_MS = 500;
const WORKSPACE_PREFIX = "workspace:";
const MAX_WORKSPACES = 10;    

function storageKey(persistanceKey: string) {
  return `${WORKSPACE_PREFIX}${persistanceKey}`;
}

function getSavedWorkspaceIds(): string[] {
  const raw = localStorage.getItem(`${WORKSPACE_PREFIX}list`);
  return raw ? JSON.parse(raw) : [];
}

function saveWorkspaceId(id: string) {
  let ids = getSavedWorkspaceIds();

  ids = ids.filter((x) => x !== id);
  ids.unshift(id);

  if (ids.length > MAX_WORKSPACES) {
    const toRemove = ids.slice(MAX_WORKSPACES);
    toRemove.forEach((oldId) => localStorage.removeItem(storageKey(oldId)));
    ids = ids.slice(0, MAX_WORKSPACES);
  }

  localStorage.setItem(`${WORKSPACE_PREFIX}list`, JSON.stringify(ids));
}

export function saveWorkspace(
  persistanceKey: string,
  state: PersistedWorkspace
) {
  localStorage.setItem(
    storageKey(persistanceKey),
    JSON.stringify(state)
  );
  saveWorkspaceId(persistanceKey);
}

export function loadWorkspace(
  persistanceKey: string
): PersistedWorkspace | null {
  const raw = localStorage.getItem(storageKey(persistanceKey));
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setupAutoSave(store: StoreApi<WorkspaceState>) {
  const autoSave = debounce((state: WorkspaceState) => {
    if (!state.persistanceKey) return;
    saveWorkspace(state.persistanceKey, {
      nodes: state.nodes,
      activeFileId: state.activeFileId,
      rootId: state.rootId,
      persistanceKey: state.persistanceKey,
    });
  }, AUTOSAVE_DELAY_MS);

  store.subscribe(autoSave);
}