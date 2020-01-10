import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  signUpRoot: {
    padding: theme.spacing(1),
    width: '100%',
    display: 'grid',
    justifyItems: 'center'
  },
  signUpTitle: {
    margin: theme.spacing(2, 0),
    textAlign: 'center'
  },
  signUpAlert: {
    width: '90%',
    marginBottom: theme.spacing(1)
  },
  signUpForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '70%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '35%'
    }
  },
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
