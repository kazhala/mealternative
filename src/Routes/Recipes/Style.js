import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  recipeRoot: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  recipeSearchRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  recipeSearchField: {
    width: '80%',
    marginRight: theme.spacing(1)
  }
}));

export default useStyles;
