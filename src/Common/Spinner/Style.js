import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  spinnerWraper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageSpinner: {
    position: 'relative'
  },

  loadMoreSpinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: theme.spacing(3),
    maxHeight: theme.spacing(3),
    height: theme.spacing(3)
  },
  loadMoreButton: {
    width: '95%',
    [theme.breakpoints.up('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.up('md')]: {
      width: '65%'
    }
  },
  accountLoadMore: {
    width: '95%',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.up('md')]: {
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%'
    }
  }
}));

export default useStyles;
