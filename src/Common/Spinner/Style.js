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
  }
}));

export default useStyles;
