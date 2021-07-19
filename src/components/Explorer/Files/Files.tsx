import fs from "fs";
import path from "path";
import React from "react";
// eslint-disable-next-line import/no-cycle
import Folder from "../Folder/Folder";
import File from "../File/File";

interface IFilesProps {
  files: string[];
  filePath: string;
  nestCount: number;
}
const Files = ({ files, filePath, nestCount }: IFilesProps) => {
  const listItems = files.map((file) => {
    const newFilePath = path.join(filePath, file);
    if (!fs.statSync(newFilePath).isDirectory()) {
      return (
        <File key={newFilePath} filePath={newFilePath} nestCount={nestCount} />
      );
    }
    return (
      <Folder key={newFilePath} filePath={newFilePath} nestCount={nestCount} />
    );
  });
  return <>{listItems}</>;
};

export default Files;
