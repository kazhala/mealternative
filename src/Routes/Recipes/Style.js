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
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  recipeSearchField: {
    width: '80%',
    marginRight: theme.spacing(1)
  },

  recipeBodyRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100%',
    gridGap: theme.spacing(1)
  },
  recipeBody: {
    border: '1px solid black'
  },

  recipeCardRoot: {
    width: '100%'
  },
  recipeCardImage: {
    width: '100%',
    height: 'auto'
  },
  recipeCardTitle: {
    display: '-webkit-box',
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    boxOrient: 'vertical'
  },
  recipeCardWithIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  recipeCardRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  recipeCardAvatar: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5)
  },

  recipeDial: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  }
}));

export default useStyles;
