import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  defaultRouteRoot: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '5fr 1fr 5fr'
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
  }
}));

export default useStyles;
