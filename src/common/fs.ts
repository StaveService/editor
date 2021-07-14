import fs from 'fs';
import path from 'path';
import { IFolder } from './interface';

export const getFolder = (folderPath: string) => {
  const folder = fs.readdirSync(folderPath);
  const folders: IFolder[] = folder.map((file) => {
    const filePath = path.join(folderPath, file);
    const fileName = file;
    const fileType = fs.statSync(filePath).isDirectory() ? 'folder' : 'file';
    return { filePath, fileName, fileType };
  });
  return folders;
};

export const getFile = (filePath: string) => {
  const fileText = fs.readFileSync(filePath, 'utf-8');
  const file = {
    filePath,
    fileText,
    fileName: path.basename(filePath),
    fileExt: path.extname(filePath),
  };
  return file;
};

export const addFolder = (folderPath: string) =>
  fs.mkdirSync(folderPath, { recursive: true });

export const addFile = (folderPath: string, data = '') =>
  fs.writeFileSync(folderPath, data);
