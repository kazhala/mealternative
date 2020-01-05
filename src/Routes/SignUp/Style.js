import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  signUpRoot: {
    padding: theme.spacing(1),
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpCard: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    border: '1px solid black'
  }
}));

export default useStyles;
