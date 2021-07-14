import { makeStyles, Theme } from '@material-ui/core/styles';

export const usePaperStyles = makeStyles((theme: Theme) => ({
  paper: {
    background: theme.palette.background.paper,
  },
}));
export const useModalStyle = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
  },
}));
