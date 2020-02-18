import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // speedial
  recipeDial: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  }
}));

export default useStyles;
