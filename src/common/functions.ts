import { Dispatch, SetStateAction } from 'react';
import { monaco } from 'react-monaco-editor';

interface IFile {
  fileText: string;
  fileName: string;
}

export const createMonacoModel = (
  setMonacoModels: Dispatch<SetStateAction<monaco.editor.ITextModel[]>>
) => {
  return ({ fileText, fileName }: IFile) => {
    const monacoModel = monaco.editor.createModel(
      fileText,
      undefined,
      monaco.Uri.file(fileName)
    );
    setMonacoModels((prevMonacoModels) => [...prevMonacoModels, monacoModel]);
  };
};

export default () => {};
