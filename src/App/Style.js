import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100%'
  },
  menuBarLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 1rem'
  },
  layout: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr'
  },
  contentRoot: {
    height: '100%',
    width: '100%',
    overflow: 'scroll'
  },
  offset: theme.mixins.toolbar,
  menuBarRight: {
    display: 'flex',
    alignItems: 'center'
  },
  menuBarLeft: {
    display: 'flex',
    marginRight: theme.spacing(1)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(0.5, 0.5, 0.5, 5),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  sideBarRoot: {
    width: '150px',
    backgroundColor: 'white'
  }
}));

export default useStyles;
