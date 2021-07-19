import { Dispatch, SetStateAction } from "react";
import { monaco } from "react-monaco-editor";
import { IFile } from "../slices/tab";

export const createMonacoModel = (
  setMonacoModels: Dispatch<SetStateAction<monaco.editor.ITextModel[]>>
) => {
  return ({ fileText, filePath }: IFile) => {
    const monacoModel = monaco.editor.createModel(
      fileText,
      undefined,
      monaco.Uri.file(filePath)
    );
    setMonacoModels((prevMonacoModels) => [...prevMonacoModels, monacoModel]);
  };
};

export default () => {};
