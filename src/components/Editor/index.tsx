import fs from "fs";
import React, { useRef, useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ipcRenderer } from "electron";
import MonacoEditor, { monaco } from "react-monaco-editor";
import Box from "@material-ui/core/Box";
import { createMonacoModel } from "../../common/functions";
import {
  changed,
  change,
  add,
  selectTabs,
  selectActiveTabIndex,
} from "../../slices/tab";
import { selectTheme } from "../../slices/theme";
import MonacoModelsContext from "../../contexts/MonacoModels";
import Tabs from "./EditorTab/EditorTab";
import ipc from "../../constants/ipc.json";

const Editor = () => {
  const editorRef = useRef<MonacoEditor>(null);
  const { monacoModels, setMonacoModels } = useContext(MonacoModelsContext);
  const dispatch = useDispatch();
  const tabs = useSelector(selectTabs);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const theme = useSelector(selectTheme);
  const handleChange = () => dispatch(change());
  const saveTab = useCallback(() => {
    const { filePath } = tabs[activeTabIndex];
    fs.writeFileSync(filePath, editorRef.current?.editor?.getValue() || "");
    dispatch(changed());
  }, [activeTabIndex, dispatch, tabs]);

  // open file
  useEffect(() => {
    ipcRenderer.on(ipc.openFile, (_e, filePath: string) => {
      dispatch(
        add({
          filePath,
          fileText: fs.readFileSync(filePath, "utf-8"),
          createMonacoModel: createMonacoModel(setMonacoModels),
        })
      );
    });
    return () => {
      ipcRenderer.removeAllListeners(ipc.openFile);
    };
  }, [dispatch, setMonacoModels]);

  // set monacoModel
  useEffect(() => {
    if (!tabs.length) return;
    editorRef.current?.editor?.setModel(monacoModels[activeTabIndex]);
  }, [activeTabIndex, monacoModels, tabs]);

  // add monacoCommand
  useEffect(() => {
    const editor = editorRef.current
      ?.editor as monaco.editor.IStandaloneCodeEditor;
    editor.addCommand(
      // eslint-disable-next-line no-bitwise
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
      saveTab
    );
  }, [saveTab]);

  return (
    <Box className="Editor" height="100%">
      <Tabs />
      <MonacoEditor
        ref={editorRef}
        theme={`vs-${theme}`}
        onChange={handleChange}
        options={{ automaticLayout: true }}
      />
    </Box>
  );
};

export default Editor;
