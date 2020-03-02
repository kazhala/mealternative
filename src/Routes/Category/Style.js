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
    minHeight: theme.spacing(10),
    height: theme.spacing(10),
    position: 'relative'
  },
  categoryTitle: {
    position: 'absolute',
    left: theme.spacing(1),
    bottom: theme.spacing(1),
    color: theme.palette.common.white
  },

  categoryBody: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.up('md')]: {
      width: '65%',
      gridTemplateColumns: 'repeat(3, 1fr)'
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  },
  categoryBodyColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default useStyles;
