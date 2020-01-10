import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  signInRoot: {
    padding: theme.spacing(1),
    width: '100%',
    display: 'grid',
    justifyItems: 'center',
    gridTemplateRows: 'auto 70% auto auto'
  },
  signInTitle: {
    margin: theme.spacing(2, 0),
    textAlign: 'center'
  },
  signInAlert: {
    width: '90%',
    marginBottom: theme.spacing(1)
  },
  signInForm: {
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
  signInInput: {
    margin: theme.spacing(0.5, 0)
  },
  signInButton: {
    margin: theme.spacing(0.5, 0),
    height: theme.spacing(2.5)
  },
  signInLinks: {
    textAlign: 'center',
    margin: theme.spacing(0.5, 0)
  }
}));

export default useStyles;
