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
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15),
      minHeight: theme.spacing(15)
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(20),
      minHeight: theme.spacing(20)
    }
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))'
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(auto-fill, minman(222px, 1fr))'
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: 'repeat(auto-fill, minman(256px, 1fr))'
    }
  },
  categoryBodyColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default useStyles;
