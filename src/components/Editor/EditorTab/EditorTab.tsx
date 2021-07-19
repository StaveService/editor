import path from "path";
import React, { useContext, ChangeEvent, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import CloseBtn from "./CloseBtn/CloseBtn";
import MonacoModelsContext from "../../../contexts/MonacoModels";
import {
  select,
  remove,
  selectTabs,
  selectActiveTabIndex,
  ITab,
} from "../../../slices/tab";

const EditorTabs: React.FC = () => {
  const dispatch = useDispatch();
  const tabs = useSelector(selectTabs);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const { setMonacoModels } = useContext(MonacoModelsContext);
  const handleChange = (
    _e: ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => dispatch(select(newValue));

  const tabItems = tabs.map(({ filePath, isChanged }: ITab, index: number) => {
    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      dispatch(remove(index));
      setMonacoModels((prevMonacoModels) =>
        prevMonacoModels.filter((model, i) => {
          if (i !== index) return true;
          model.dispose();
          return false;
        })
      );
    };

    return (
      <Tab
        key={filePath}
        style={{ textTransform: "none" }}
        label={
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="body2">{path.basename(filePath)}</Typography>
            <CloseBtn isChanged={isChanged} onClick={handleClose} />
          </Box>
        }
      />
    );
  });
  return (
    <Paper square>
      <Tabs
        indicatorColor="secondary"
        textColor="secondary"
        value={activeTabIndex}
        onChange={handleChange}
        scrollButtons="auto"
        variant="scrollable"
      >
        {tabItems}
      </Tabs>
    </Paper>
  );
};

export default EditorTabs;
