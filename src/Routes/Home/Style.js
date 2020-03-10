import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  homeRoot: {
    width: '100%',
    padding: theme.spacing(1)
  },

  // top part of the homepage
  homeTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: theme.spacing(1)
    }
  },
  topCard: {
    width: '100%',
    height: theme.spacing(10),
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',
    position: 'relative',
    '&:hover': {
      boxShadow: theme.shadows[8],
      backgroundSize: '110%',
      cursor: 'pointer'
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(20)
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(25)
    },
    [theme.breakpoints.up('xl')]: {
      height: theme.spacing(30)
    }
  },
  topCardTitle: {
    position: 'absolute',
    left: theme.spacing(1),
    bottom: theme.spacing(1),
    color: theme.palette.common.white
  },
  topCardDescription: {
    position: 'absolute',
    right: theme.spacing(0),
    bottom: theme.spacing(0),
    color: theme.palette.common.white
  },

  // bottom part of the homepage
  homeBottom: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)'
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))'
    }
  },
  homeBottomTitle: {
    gridColumn: '1/-1'
  },
  categoryCard: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '100%',
    backgroundSize: '150%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(),
    '&:hover': {
      cursor: 'pointer',
      boxShadow: theme.shadows[5],
      backgroundSize: '160%'
    }
  }
}));

export default useStyles;
