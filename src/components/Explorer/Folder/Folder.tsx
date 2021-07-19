import fs from "fs";
import path from "path";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import DescriptionIcon from "@material-ui/icons/Description";
import ReplayIcon from "@material-ui/icons/Replay";
import { Typography } from "@material-ui/core";
// eslint-disable-next-line import/no-cycle
import Files from "../Files/Files";
import FilesInputs from "../Files/Input/Input";
import Icons from "./Icons/Icon";

interface IFolderProps {
  filePath: string;
  isRoot?: boolean;
  nestCount: number;
}

const useStyles = makeStyles((theme) => ({
  nested: ({ nestCount }: { nestCount: number }) => ({
    paddingLeft: theme.spacing(2 * nestCount),
  }),
  listItemIcon: {
    minWidth: "30px",
  },
}));

const Folder = ({ filePath, isRoot, nestCount }: IFolderProps) => {
  const classes = useStyles({ nestCount });
  const [isActiveFileInput, setIsActiveFileInput] = useState(false);
  const [isActiveFolderInput, setIsActiveFolderInput] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [openFolder, setOpenFolder] = useState(false);

  const handleToggleFolder = useCallback(() => {
    if (!openFolder) {
      setFiles(fs.readdirSync(filePath));
      setOpenFolder(true);
    } else {
      setFiles([]);
      setOpenFolder(false);
    }
  }, [filePath, openFolder]);

  const handleClickIcons = () => {
    setOpenFolder(true);
    setFiles(fs.readdirSync(filePath));
  };
  const handleActiveFileInput = () => setIsActiveFileInput(true);
  const handleActiveFolderInput = () => setIsActiveFolderInput(true);
  const handleFilesRefresh = useCallback(
    () => setFiles(fs.readdirSync(filePath)),
    [filePath]
  );

  const icons = useMemo(() => {
    const ary = [
      {
        children: <DescriptionIcon fontSize="small" />,
        handleActiveInput: handleActiveFileInput,
      },
      {
        children: <CreateNewFolderIcon fontSize="small" />,
        handleActiveInput: handleActiveFolderInput,
      },
    ];
    if (isRoot)
      ary.unshift({
        children: <ReplayIcon fontSize="small" />,
        handleActiveInput: handleFilesRefresh,
      });
    return ary;
  }, [handleFilesRefresh, isRoot]);

  const inputs = useMemo(
    () => [
      {
        inputType: "folder" as const,
        isActiveInput: isActiveFolderInput,
        setActiveInput: setIsActiveFolderInput,
        setFiles,
        filePath,
      },
      {
        inputType: "file" as const,
        isActiveInput: isActiveFileInput,
        setActiveInput: setIsActiveFileInput,
        setFiles,
        filePath,
      },
    ],
    [filePath, isActiveFileInput, isActiveFolderInput]
  );
  // when open accordion & open folder, close accorion
  useEffect(() => {
    setOpenFolder(false);
  }, [filePath]);

  return (
    <>
      <ListItem
        button
        disableGutters
        onClick={handleToggleFolder}
        className={`Folder ${classes.nested}`}
      >
        <ListItemIcon className={classes.listItemIcon}>
          {openFolder ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Box pr={13}>
              <Typography variant="body2" noWrap>
                {path.basename(filePath)}
              </Typography>
            </Box>
          }
        />
        <ListItemSecondaryAction onClick={handleClickIcons}>
          <Icons icons={icons} />
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={openFolder} unmountOnExit>
        <List component="div" disablePadding>
          <FilesInputs inputs={inputs} />
          <Files filePath={filePath} files={files} nestCount={nestCount + 1} />
        </List>
      </Collapse>
    </>
  );
};

Folder.defaultProps = {
  isRoot: false,
};

export default Folder;
