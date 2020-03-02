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
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '8fr 3fr',
    marginBottom: theme.spacing(1),
    gridGap: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.up('md')]: {
      width: '65%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%'
    }
  },
  recipeSearchField: {
    width: '100%',
    marginRight: theme.spacing(1)
  },

  // body
  recipeBodyRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.up('md')]: {
      width: '65%',
      gridTemplateColumns: 'repeat(3, 1fr)'
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
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
