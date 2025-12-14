import { getAncestorIdList } from "../../store/tree"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useWorkspaceStore } from "../../store/store"

export function FileBreadcrumb() {
  const nodes = useWorkspaceStore((state) => state.nodes);
  const activeFileId = useWorkspaceStore((state) => state.activeFileId);

  const ancestorIdList = 
    activeFileId ? 
      getAncestorIdList(nodes, activeFileId) :
      [];

  ancestorIdList.shift();

  const ancestorList = ancestorIdList.map((id) => ({
    name: nodes[id].name,
    id,
  }));

  const getAncestorElement = (ancestor: { name: string, id: string }, index: number) => (
    <>
      <BreadcrumbItem key={ancestor.id}>
        {ancestor.name}
      </BreadcrumbItem>
      {index !== ancestorList.length - 1 && <BreadcrumbSeparator />}
    </>
  )

  return (
    <Breadcrumb className="px-2 bg-[#121318ff]">
      <BreadcrumbList>
        {ancestorList.map(getAncestorElement)}
      </BreadcrumbList>
    </Breadcrumb>
  );
}