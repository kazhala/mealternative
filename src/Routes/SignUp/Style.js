import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  signUpInput: {
    margin: theme.spacing(0.5, 0)
  },
  signUpButton: {
    margin: theme.spacing(0.5, 0),
    height: theme.spacing(2.5)
  },
  signUpLinks: {
    textAlign: 'center',
    margin: theme.spacing(0.5, 0)
  }
}));

export default useStyles;
