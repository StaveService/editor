import { remote, ipcRenderer } from 'electron';
import path from 'path';
import fs from 'fs';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MonacoModelsContext from '../../../contexts/MonacoModels';
import { refresh } from '../../../slices/tab';
import ipc from '../../../constants/ipc.json';
import { openFolderRemote } from '../../../common/dialog';
import { addTemplate } from '../../../common/templates';
import { IFolder, INewProjectFormValues } from '../../../common/interface';
import { useModalStyle } from '../../../common/materialStyles';

interface INewProjectModal {
  setRootFolder: Dispatch<SetStateAction<IFolder | undefined>>;
}
const NewProjectModal = ({ setRootFolder }: INewProjectModal) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [error, setError] = useState('');
  const { setMonacoModels } = useContext(MonacoModelsContext);
  const dispatch = useDispatch();
  const classes = useModalStyle();
  const { control, handleSubmit, setValue } = useForm();
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClick = async () =>
    setValue('projectPath', await openFolderRemote());
  const handleChange = (panel: string) => (
    _e: React.ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean
  ) => setExpanded(isExpanded ? panel : false);

  const onSubmit: SubmitHandler<INewProjectFormValues> = (data) => {
    addTemplate(data);
    handleClose();
    dispatch(refresh());
    setMonacoModels((prevMonacoModels) => {
      prevMonacoModels.forEach((model) => model.dispose());
      return [];
    });
    setRootFolder({
      filePath: data.projectPath,
      fileType: 'folder',
      fileName: data.title,
    });
  };

  useEffect(() => {
    ipcRenderer.on(ipc.openNewProjectModal, handleOpen);
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
          <Typography variant="h6" align="center" gutterBottom>
            New Project
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 100 }}
              render={({ ref, value, onChange }, { invalid }) => (
                <TextField
                  label="Title"
                  variant="filled"
                  fullWidth
                  value={value}
                  inputRef={ref}
                  onChange={(e) => {
                    setValue(
                      'projectPath',
                      path.join(
                        remote.app.getPath('documents'),
                        'stave',
                        e.target.value
                      )
                    );
                    onChange(e.target.value);
                  }}
                  error={invalid}
                />
              )}
            />
            <Controller
              name="artist"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 100 }}
              render={({ ref, onChange }, { invalid }) => (
                <TextField
                  label="Artist"
                  variant="filled"
                  fullWidth
                  inputRef={ref}
                  onChange={(e) => onChange(e.target.value)}
                  error={invalid}
                />
              )}
            />

            <Accordion
              expanded={expanded === 'template'}
              onChange={handleChange('template')}
            >
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
            <Accordion
              expanded={expanded === 'details'}
              onChange={handleChange('details')}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Controller
                    name="bpm"
                    control={control}
                    defaultValue={90}
                    rules={{ maxLength: 100 }}
                    render={({ ref, value, onChange }, { invalid }) => (
                      <TextField
                        label="BPM"
                        variant="filled"
                        size="small"
                        fullWidth
                        value={value}
                        inputRef={ref}
                        onChange={(e) => onChange(e.target.value)}
                        error={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="subtitle"
                    control={control}
                    defaultValue=""
                    rules={{ maxLength: 100 }}
                    render={({ ref, onChange }, { invalid }) => (
                      <TextField
                        label="Subtitle"
                        variant="filled"
                        size="small"
                        fullWidth
                        inputRef={ref}
                        onChange={(e) => onChange(e.target.value)}
                        error={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="album"
                    control={control}
                    defaultValue=""
                    rules={{ maxLength: 100 }}
                    render={({ ref, onChange }, { invalid }) => (
                      <TextField
                        label="Album"
                        variant="filled"
                        size="small"
                        fullWidth
                        inputRef={ref}
                        onChange={(e) => onChange(e.target.value)}
                        error={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="music"
                    control={control}
                    defaultValue=""
                    rules={{ maxLength: 100 }}
                    render={({ ref, onChange }, { invalid }) => (
                      <TextField
                        label="Music"
                        variant="filled"
                        size="small"
                        fullWidth
                        inputRef={ref}
                        onChange={(e) => onChange(e.target.value)}
                        error={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="words"
                    control={control}
                    defaultValue=""
                    rules={{ maxLength: 100 }}
                    render={({ ref, onChange }, { invalid }) => (
                      <TextField
                        label="Words"
                        variant="filled"
                        size="small"
                        fullWidth
                        inputRef={ref}
                        onChange={(e) => onChange(e.target.value)}
                        error={invalid}
                      />
                    )}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Controller
              name="projectPath"
              control={control}
              defaultValue={path.join(remote.app.getPath('documents'), 'stave')}
              rules={{
                required: true,
                maxLength: 100,
                validate: (value) => !fs.existsSync(value) || 'File is exist',
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
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create New Project
            </Button>
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default NewProjectModal;
