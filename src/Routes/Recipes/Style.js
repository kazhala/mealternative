import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // root
  recipeRoot: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'relative'
  },
  recipeSearchRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  recipeSearchField: {
    width: '80%',
    marginRight: theme.spacing(1)
  },

  // body
  recipeBodyRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(1)
  },
  recipeBodyColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  // speedial
  recipeDial: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  }
}));

export default useStyles;
