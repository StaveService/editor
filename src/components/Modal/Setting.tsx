import simpleGit, { RemoteWithRefs, SimpleGit } from "simple-git";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { change } from "../../slices/theme";
import ipc from "../../constants/ipc.json";
import { useModalStyle } from "../../common/materialStyles";
import useOpen from "../../hooks/useOpen/useOpen";
import ControlTextField from "../ControlTextField/ControlTextField";
import LoadingButton from "../../ui/LoadingButton";
import { selectWorkDir } from "../../slices/workDir";

const Setting = () => {
  const [remotes, setRemotes] = useState<RemoteWithRefs[]>([]);
  const [simpleGitIns, setSimpleGitIns] = useState<SimpleGit>();
  const [open, handleOpen, handleClose] = useOpen();
  const { control, errors, handleSubmit } = useForm();
  const classes = useModalStyle();
  const dispatch = useDispatch();
  const workDir = useSelector(selectWorkDir);
  const handleChange = () => dispatch(change());
  const onSubmit = (data: { name: string; repo: string }) => {
    setRemotes((prev) => [...prev]);
    simpleGitIns?.addRemote(data.name, data.repo);
  };
  useEffect(() => {
    const git = simpleGit(workDir);
    setSimpleGitIns(git);
    git.getRemotes(true, (_err, getedRemotes) => setRemotes(getedRemotes));
  }, [workDir]);
  useEffect(() => {
    ipcRenderer.on(ipc.openSettingModal, handleOpen);
    return () => {
      ipcRenderer.removeAllListeners(ipc.openNewProjectModal);
    };
  }, [handleOpen]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      fullWidth
    >
      <Fade in={open}>
        <Paper>
          <DialogTitle>Setting</DialogTitle>
          <List>
            <Box width={500}>
              <Divider />
              <ListItem>
                <ListItemText primary="Theme" />
                <ListItemSecondaryAction>
                  <Switch onChange={handleChange} color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              {workDir && (
                <>
                  {remotes.map((remote) => {
                    const handleRemove = () => {
                      setRemotes((prev) =>
                        prev.filter(
                          (prevRemote) => prevRemote.name !== remote.name
                        )
                      );
                      simpleGitIns?.removeRemote(remote.name);
                    };
                    return (
                      <React.Fragment key={remote.name}>
                        <ListItem>
                          <ListItemText
                            primary={remote.refs.fetch}
                            secondary={remote.name}
                          />
                          <ListItemSecondaryAction>
                            <LoadingButton
                              loading={false}
                              size="small"
                              color="secondary"
                              onClick={handleRemove}
                            >
                              remove
                            </LoadingButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                  <ListItem>
                    <Box
                      component="form"
                      width="100%"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Grid container>
                        <Grid item xs={10}>
                          <ControlTextField
                            control={control}
                            errors={errors}
                            defaultValue=""
                            name="repo"
                            label="repo"
                            fullWidth
                          />
                          <ControlTextField
                            control={control}
                            errors={errors}
                            defaultValue="origin"
                            name="name"
                            label="name"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <LoadingButton
                            type="submit"
                            loading={false}
                            size="small"
                          >
                            add
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </ListItem>
                  <Divider />
                </>
              )}
            </Box>
          </List>
        </Paper>
      </Fade>
    </Dialog>
  );
};
export default Setting;
