import { remote, dialog } from "electron";
import path from "path";
import { addFile } from "./fs";

const compileJS = require("./vm");

type Properties =
  | "openFile"
  | "openDirectory"
  | "multiSelections"
  | "showHiddenFiles"
  | "createDirectory"
  | "promptToCreate"
  | "noResolveAliases"
  | "treatPackageAsDirectory"
  | "dontAddToRecent";

const open = (dialogType: typeof dialog, properties: Properties) =>
  dialogType
    .showOpenDialog({ properties: [properties] })
    .then((dir) => {
      const { filePaths, canceled } = dir;
      if (canceled) return null;
      return filePaths[0];
    })
    .catch((err) => err);
const Folder = (dialogType: typeof dialog) => open(dialogType, "openDirectory");
const File = (dialogType: typeof dialog) => open(dialogType, "openFile");
export const openFolder = () => Folder(dialog);
export const openFile = () => File(dialog);
export const openFolderRemote = () => Folder(remote.dialog);
export const openFileRemote = () => File(remote.dialog);

export const saveTexFile = async () => {
  const savedFiles = await dialog.showSaveDialog({
    title: "Export Tex File",
    defaultPath: ".",
    filters: [{ name: "TEX File", extensions: ["tex"] }],
  });
  const { canceled, filePath } = savedFiles;
  if (canceled || !filePath) return null;
  addFile(filePath, compileJS(path.join(path.dirname(filePath), "index.js")));
  return null;
};

export default () => {};
