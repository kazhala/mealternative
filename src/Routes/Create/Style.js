/*
  The default create page styles
  style for recipe and meal are in nested recipe/meal folder
*/
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // default route
  defaultRouteRoot: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      display: 'grid',
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
    height: '100%',
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
  }
}));

export default useStyles;
