import React from 'react';
// eslint-disable-next-line import/no-cycle
import Folder from '../Folder/Folder';
import File from '../File/File';
import { IFiles } from '../../../common/interface';

interface IFilesProps {
  files: IFiles[];
  nestCount: number;
}
const Files = ({ files, nestCount }: IFilesProps) => {
  const listItems = files.map(
    ({ fileType, fileName, filePath, fileExt, isChanged }) => {
      if (fileType === 'file')
        return (
          <File
            key={filePath}
            fileName={fileName}
            filePath={filePath}
            fileExt={fileExt}
            isChanged={isChanged}
            nestCount={nestCount}
          />
        );
      if (fileType === 'folder')
        return (
          <Folder
            key={filePath}
            fileName={fileName}
            filePath={filePath}
            nestCount={nestCount}
          />
        );
      return null;
    }
  );
  return <>{listItems}</>;
};

export default Files;
