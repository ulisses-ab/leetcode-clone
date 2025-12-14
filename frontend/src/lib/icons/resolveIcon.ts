import materialIconsRaw from "./material-icons.json";

const BASE = "src/assets/icons";

export function resolveIcon(
  name?: string,
  isFolder?: boolean,
) {
  const materialIcons = materialIconsRaw as any;

  if(!name) {
    return `${BASE}/file.svg`
  }

  if (isFolder) {
    const folderIcon =
      materialIcons.folderNames?.[name] ??
      materialIcons.folder;

    return `${BASE}/${folderIcon}.svg`;
  }

  const ext = name.split(".").pop() ?? "";
  const fileIcon =
    materialIcons.fileExtensions?.[ext] ??
    materialIcons.file;

  return `${BASE}/${fileIcon}.svg`;
}
