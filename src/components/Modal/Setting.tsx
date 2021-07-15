import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
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
import { useDispatch } from "react-redux";
import { change } from "../../slices/theme";
import ipc from "../../constants/ipc.json";
import { useModalStyle } from "../../common/materialStyles";

const Setting = () => {
  const [open, setOpen] = useState(false);
  const classes = useModalStyle();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = () => dispatch(change());
  useEffect(() => {
    ipcRenderer.on(ipc.openSettingModal, handleOpen);
    return () => {
      ipcRenderer.removeAllListeners(ipc.openNewProjectModal);
    };
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <Fade in={open}>
        <Paper>
          <Box pl={2}>
            <Typography variant="h6">Setting</Typography>
          </Box>
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
            </Box>
          </List>
        </Paper>
      </Fade>
    </Modal>
  );
};
export default Setting;
