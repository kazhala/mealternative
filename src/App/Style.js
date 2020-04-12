import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100%',
  },
  menuBarLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 1rem',
  },
  layout: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  contentRoot: {
    height: '100%',
    width: '100%',
    overflow: 'scroll',
  },
  offset: theme.mixins.toolbar,

  // menu bar
  menuBarRight: {
    display: 'flex',
    alignItems: 'center',
  },
  menuBarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  // if no !important, for some reason, overide by material ui?
  headerLogo: {
    width: '7rem !important',
  },
  search: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(0.5, 0.5, 0.5, 5),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
    [theme.breakpoints.up('lg')]: {
      width: 250,
      '&:focus': {
        width: 350,
      },
    },
  },
  wtfAvatar: {
    height: '1em',
    width: '1em',
  },

  // sidebar
  sideBarRoot: {
    width: '180px',
    backgroundColor: 'white',
  },
  sideBarListItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  sideBarTitle: {
    padding: theme.spacing(1, 0.5),
    textAlign: 'center',
  },
}));

export default useStyles;
