import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  signUpRoot: {
    padding: theme.spacing(1),
    height: '100%',
    width: '100%',
    display: 'grid',
    justifyItems: 'center'
  },
  signUpSocial: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '80%'
  },
  signUpGoogle: {
    width: theme.spacing(17),
    height: theme.spacing(3),
    paddingLeft: '1rem !important',
    fontSize: '1rem !important'
  }
}));

export default useStyles;
