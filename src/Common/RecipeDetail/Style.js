import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  detailRecipeRoot: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    alignItems: 'center',
    minHeight: '100%',
  },
  detailCloseBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1,
  },
  detailAvatar: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    height: theme.spacing(3),
    width: theme.spacing(3),
    cursor: 'pointer',
  },
  detailBody: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '85%',
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
    },
  },

  // top part
  detailThumbRoot: {
    width: '100%',
    height: theme.spacing(10),
    minHeight: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15),
      minHeight: theme.spacing(15),
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(20),
      minHeight: theme.spacing(20),
    },
  },
  detailTitle: {
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(0, 0.5),
  },

  // misc actions
  detailMiscRoot: {
    width: '100%',
    display: 'flex',
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(0, 0.5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  detailBookMark: {
    marginRight: theme.spacing(0.5),
  },
  detailIconText: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.7',
    },
  },

  // lists
  detailListsRoot: {
    width: '100%',
  },

  // steps
  stepImage: {
    width: '100%',
    height: theme.spacing(10),
    minHeight: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15),
      minHeight: theme.spacing(15),
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(20),
      minHeight: theme.spacing(20),
    },
  },
  stepLabel: {
    cursor: 'pointer',
    overflowWrap: 'break-word',
  },
}));

export default useStyles;
