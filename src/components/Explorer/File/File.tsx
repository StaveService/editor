import React, { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DescriptionIcon from '@material-ui/icons/Description';
import { Typography } from '@material-ui/core';
import { IFile } from '../../../common/interface';
import { getFile } from '../../../common/fs';
import { add } from '../../../slices/tab';
import MonacoModelsContext from '../../../contexts/MonacoModels';
import { createMonacoModel } from '../../../common/functions';

interface IFileProps extends IFile {
  nestCount: number;
}

const useStyles = makeStyles((theme) => ({
  nested: ({ nestCount }: { nestCount: number }) => ({
    paddingLeft: theme.spacing(2 * nestCount),
  }),
  listItemIcon: {
    minWidth: '30px',
  },
}));

const File = ({ fileName, filePath, nestCount }: IFileProps) => {
  const classes = useStyles({ nestCount });
  const dispatch = useDispatch();
  const { setMonacoModels } = useContext(MonacoModelsContext);

  const handleClick = useCallback(() => {
    const { fileText, fileExt } = getFile(filePath);
    dispatch(
      add({
        filePath,
        fileExt,
        fileName,
        fileText,
        createMonacoModel: createMonacoModel(setMonacoModels),
      })
    );
  }, [dispatch, fileName, filePath, setMonacoModels]);

  return (
    <ListItem button onClick={handleClick} className={`File ${classes.nested}`}>
      <ListItemIcon className={classes.listItemIcon}>
        <DescriptionIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body2">{fileName}</Typography>}
      />
    </ListItem>
  );
};

export default File;
