import { createContext, Dispatch, SetStateAction } from 'react';
import { monaco } from 'react-monaco-editor';

interface UseMonacoModelsState {
  readonly monacoModels: monaco.editor.ITextModel[];
  readonly setMonacoModels: Dispatch<
    SetStateAction<monaco.editor.ITextModel[]>
  >;
}
const MonacoModels = createContext({} as UseMonacoModelsState);
export default MonacoModels;
