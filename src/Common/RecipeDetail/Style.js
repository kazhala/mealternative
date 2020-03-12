import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  detailRecipeRoot: {
    position: 'fixed',
    top: theme.spacing(3.5),
    bottom: 0,
    left: 0,
    right: 0,
    //put on top of the speedDial
    zIndex: '2000',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      top: theme.spacing(4)
    }
  },
  detailCloseBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1
  },
  detailAvatar: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    height: theme.spacing(3),
    width: theme.spacing(3),
    cursor: 'pointer'
  },
  detailBody: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '85%'
    },
    [theme.breakpoints.up('md')]: {
      width: '70%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%'
    }
  },

  // top part
  detailThumbRoot: {
    width: '100%',
    height: theme.spacing(10),
    minHeight: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15),
      minHeight: theme.spacing(15)
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(20),
      minHeight: theme.spacing(20)
    }
  },
  detailTitleDes: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(0.5)
  },

  // misc actions
  detailMiscRoot: {
    width: '100%',
    display: 'flex',
    padding: theme.spacing(0, 0.5),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  detailBookMark: {
    marginRight: theme.spacing(0.5)
  },
  detailIconText: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.7'
    }
  },

  // lists
  detailListsRoot: {
    width: '100%'
  },

  // steps
  stepImage: {
    width: '100%',
    height: theme.spacing(10),
    minHeight: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15),
      minHeight: theme.spacing(15)
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(20),
      minHeight: theme.spacing(20)
    }
  },
  stepLabel: {
    cursor: 'pointer'
  }
}));

export default useStyles;
