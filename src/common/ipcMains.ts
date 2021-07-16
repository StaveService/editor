import { ipcMain } from "electron";
import ipc from "../constants/ipc.json";

const compileJS = require("./vm");

ipcMain.handle(ipc.compileJS, (_e, filePath) => compileJS(filePath));

export default () => {};
