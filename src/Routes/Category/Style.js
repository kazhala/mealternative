import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  categoryRoot: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'relative'
  },
  categoryThumb: {
    width: '100%',
    height: theme.spacing(10),
    position: 'relative'
  },
  categoryTitle: {
    position: 'absolute',
    left: theme.spacing(1),
    bottom: theme.spacing(1),
    color: theme.palette.common.white
  }
}));

export default useStyles;
