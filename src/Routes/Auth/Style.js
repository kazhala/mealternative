import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formInput: {
    margin: theme.spacing(0.5, 0)
  },
  formButton: {
    margin: theme.spacing(0.5, 0),
    height: theme.spacing(2.5)
  },
  formSubtitle: {
    marginBottom: theme.spacing(1),
    opacity: '0.7'
  }
}));

export default useStyles;
