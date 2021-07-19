import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import NewProjectModal from "../Modal/NewProject";
import { openFolderRemote } from "../../common/dialog";
import Folder from "./Folder/Folder";
import ipc from "../../constants/ipc.json";

const Explorer = () => {
  const [rootFolder, setRootFolder] = useState<string>("");
  const handleClick = async () => {
    const filePath = await openFolderRemote();
    setRootFolder(filePath);
  };

  useEffect(() => {
    ipcRenderer.on(ipc.openFolder, (_event, filePath) => {
      setRootFolder(filePath);
    });
    return () => {
      ipcRenderer.removeAllListeners(ipc.openFolder);
    };
  }, []);

  return (
    <Paper style={{ height: "100%", overflow: "auto" }}>
      <NewProjectModal setRootFolder={setRootFolder} />
      <List
        dense
        subheader={<ListSubheader color="default">EXPLORER</ListSubheader>}
      >
        {rootFolder ? (
          <Folder isRoot nestCount={0} filePath={rootFolder} />
        ) : (
          <Box textAlign="center">
            <Button variant="outlined" onClick={handleClick}>
              Open Folder
            </Button>
          </Box>
        )}
      </List>
    </Paper>
  );
};

export default Explorer;
