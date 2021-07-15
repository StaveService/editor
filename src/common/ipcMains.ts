import { ipcMain } from "electron";
import { compileJS } from "./vm";
import ipc from "../app/constants/ipc.json";

ipcMain.handle(ipc.compileJS, (_e, filePath) => compileJS(filePath));

export default () => {};
