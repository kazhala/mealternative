import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // default route
  defaultRouteRoot: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '5fr 1fr 5fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '5fr 1fr 5fr',
      gridTemplateRows: '1fr 2fr',
      paddingBottom: theme.spacing(15)
    }
  },
  defaultRouteTitle: {
    gridColumn: '1/-1',
    placeSelf: 'center'
  },
  createPaper: {
    fontSize: theme.spacing(7),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '&:hover': {
      borderColor: theme.palette.primary.light,
      borderWidth: '1px',
      borderStyle: 'groove',
      cursor: 'pointer'
    }
  },
  horizontalOrDividerContainer: {
    placeSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },

  // recipe route
  routeRoot: {
    padding: theme.spacing(1),
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  routeTitle: {
    textAlign: 'center'
  },
  titleInput: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  imageOption: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    height: theme.spacing(4)
  },
  imageInput: {
    marginLeft: theme.spacing(1),
    width: '100%'
  },
  fileInput: {
    display: 'none'
  }
}));

export default useStyles;
