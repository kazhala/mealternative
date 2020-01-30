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
  }
}));

export default useStyles;
