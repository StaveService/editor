import simpleGit from "simple-git";
import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoRepoPull } from "react-icons/go";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { openFolderRemote } from "../../common/dialog";
import Folder from "./Folder/Folder";
import ipc from "../../constants/ipc.json";
import { selectWorkDir, set } from "../../slices/workDir";

const Explorer = () => {
  const dispatch = useDispatch();
  const workDir = useSelector(selectWorkDir);
  const handleClick = async () => {
    const filePath = await openFolderRemote();
    dispatch(set(filePath));
  };
  const handlePush = () => {
    const git = simpleGit(workDir);
    git.add(".");
    git.commit("commit");
    git.push(["-u", "origin", "master"]);
  };
  useEffect(() => {
    ipcRenderer.on(ipc.openFolder, (_event, filePath) => {
      dispatch(set(filePath));
    });
    return () => {
      ipcRenderer.removeAllListeners(ipc.openFolder);
    };
  }, [dispatch]);

  return (
    <Paper style={{ height: "100%", overflow: "auto" }}>
      <List
        dense
        subheader={<ListSubheader color="default">EXPLORER</ListSubheader>}
      >
        {workDir ? (
          <>
            <IconButton onClick={handlePush}>
              <GoRepoPull />
            </IconButton>
            <Folder isRoot nestCount={0} filePath={workDir} />
          </>
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
