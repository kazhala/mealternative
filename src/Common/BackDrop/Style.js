import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backDropRoot: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default useStyles;
