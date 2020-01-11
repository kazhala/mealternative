import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  signInInput: {
    margin: theme.spacing(0.5, 0)
  },
  signInButton: {
    margin: theme.spacing(0.5, 0),
    height: theme.spacing(2.5)
  },
  signInLinks: {
    margin: theme.spacing(0.5, 0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export default useStyles;
