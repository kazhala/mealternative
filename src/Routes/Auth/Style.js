import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  forgotEmail: {
    margin: theme.spacing(0.5, 0)
  },
  forgotButton: {
    margin: theme.spacing(0.5, 0),
    height: theme.spacing(2.5)
  },
  forgotSubtitle: {
    marginBottom: theme.spacing(1),
    opacity: '0.7'
  }
}));

export default useStyles;
