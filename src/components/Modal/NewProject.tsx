import { remote, ipcRenderer } from "electron";
import path from "path";
import fs from "fs";
import simpleGit from "simple-git";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ControlTextField from "../ControlTextField/ControlTextField";
import MonacoModelsContext from "../../contexts/MonacoModels";
import { refresh } from "../../slices/tab";
import ipc from "../../constants/ipc.json";
import { openFolderRemote } from "../../common/dialog";
import { addTemplate } from "../../common/templates";
import { INewProjectFormValues } from "../../interfaces";
import { projectSchema } from "../../schema";
import useOpen from "../../hooks/useOpen/useOpen";

interface INewProjectModal {
  setRootFolder: Dispatch<SetStateAction<string>>;
}
const NewProjectModal = ({ setRootFolder }: INewProjectModal) => {
  const [open, handleOpen, handleClose] = useOpen();
  const { setMonacoModels } = useContext(MonacoModelsContext);
  const dispatch = useDispatch();
  const { control, errors, handleSubmit, setValue } = useForm({
    resolver: yupResolver(projectSchema),
  });
  const handleClick = async () => setValue("workDir", await openFolderRemote());

  const onSubmit: SubmitHandler<INewProjectFormValues> = (data) => {
    const projectDir = path.join(data.workDir, data.title);
    const git = simpleGit(projectDir);
    git.init();
    addTemplate(data);
    dispatch(refresh());
    setMonacoModels((prevMonacoModels) => {
      prevMonacoModels.forEach((model) => model.dispose());
      return [];
    });
    setRootFolder(projectDir);
    handleClose();
  };

  useEffect(() => {
    ipcRenderer.on(ipc.openNewProjectModal, handleOpen);
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
    >
      <Fade in={open}>
        <Box>
          <DialogTitle>New Project</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ControlTextField
                control={control}
                name="title"
                defaultValue=""
                label="Title"
                margin="normal"
                variant="filled"
                errors={errors}
                fullWidth
              />
              <ControlTextField
                control={control}
                name="artist"
                defaultValue=""
                label="Artist"
                variant="filled"
                errors={errors}
                fullWidth
              />

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Template</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <Controller
                      name="template"
                      control={control}
                      defaultValue="empty"
                      rules={{ required: true }}
                      render={({ ref, value, onChange }) => (
                        <RadioGroup
                          ref={ref}
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        >
                          <FormControlLabel
                            value="empty"
                            control={<Radio />}
                            label="Empty"
                          />
                          <FormControlLabel
                            value="band"
                            control={<Radio />}
                            label="Band"
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <ControlTextField
                      control={control}
                      name="bpm"
                      defaultValue={90}
                      label="BPM"
                      variant="filled"
                      size="small"
                      errors={errors}
                      fullWidth
                    />
                    <ControlTextField
                      control={control}
                      name="subtitle"
                      defaultValue=""
                      label="Subtitle"
                      variant="filled"
                      size="small"
                      errors={errors}
                      fullWidth
                    />
                    <ControlTextField
                      control={control}
                      name="album"
                      defaultValue=""
                      label="Album"
                      variant="filled"
                      size="small"
                      errors={errors}
                      fullWidth
                    />
                    <ControlTextField
                      control={control}
                      name="music"
                      defaultValue=""
                      label="Music"
                      variant="filled"
                      size="small"
                      errors={errors}
                      fullWidth
                    />
                    <ControlTextField
                      control={control}
                      name="words"
                      defaultValue=""
                      label="Words"
                      variant="filled"
                      size="small"
                      errors={errors}
                      fullWidth
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Controller
                name="workDir"
                control={control}
                defaultValue={path.join(
                  remote.app.getPath("documents"),
                  "stave"
                )}
                rules={{
                  required: true,
                  maxLength: 100,
                  validate: (value) => !fs.existsSync(value) || "File is exist",
                }}
                render={({ ref, value, onChange }, { invalid }) => (
                  <Paper>
                    <Box display="flex" alignItems="center" pl={2}>
                      <InputBase
                        placeholder="Save Path"
                        value={value}
                        inputRef={ref}
                        onChange={(e) => onChange(e.target.value)}
                        error={invalid}
                        style={{ flex: 1 }}
                      />
                      <IconButton onClick={handleClick}>
                        <MoreHorizIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create New Project
              </Button>
            </form>
          </DialogContent>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default NewProjectModal;
