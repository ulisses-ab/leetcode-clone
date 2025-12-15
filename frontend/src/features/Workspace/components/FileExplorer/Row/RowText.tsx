import { useState, useEffect, useRef } from "react";
import { useWorkspaceStore } from "../../../store/store";


export function RowText({ nodeId }: { nodeId: string }) {
  const renamingTriggered = useWorkspaceStore(());

  
  if (showInput) {
    return (
      <input
        ref={ref}
        type="text"
        defaultValue={node.name}
        onKeyDown={handleKeyDown}
        className="px-1 py-0 border border-blue-500 rounded outline-none"
      />
    );
  }

  return <span>{node.name}</span>;
}