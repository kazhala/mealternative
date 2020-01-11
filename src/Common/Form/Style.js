import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formRoot: {
    padding: theme.spacing(1),
    width: '100%',
    display: 'grid',
    justifyItems: 'center'
  },
  formTitle: {
    margin: theme.spacing(2, 0),
    textAlign: 'center'
  },
  formAlert: {
    width: '90%',
    marginBottom: theme.spacing(1),
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
  formForm: {
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
  }
}));

export default useStyles;
