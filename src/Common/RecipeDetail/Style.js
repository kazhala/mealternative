import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  detailRecipeRoot: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    //put on top of the speedDial
    zIndex: 1051,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll'
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
    width: theme.spacing(3)
  },

  // top part
  detailThumbRoot: {
    width: '100%',
    height: theme.spacing(10),
    minHeight: theme.spacing(10)
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
    alignItems: 'center',
    justifyContent: 'space-between'
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
    minHeight: theme.spacing(10)
  },
  stepLabel: {
    cursor: 'pointer'
  }
}));

export default useStyles;
