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

  // inidividual card
  recipeCardRoot: {
    width: '100%',
    marginBottom: theme.spacing(1.5),
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8'
    }
  },
  recipeCardImage: {
    width: '100%',
    height: theme.spacing(10),
    borderRadius: theme.shape.borderRadius
  },
  recipeCardTitle: {
    display: '-webkit-box',
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    boxOrient: 'vertical'
  },
  recipeCardWithIcon: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'auto auto',
    gridGap: theme.spacing(0.2),
    opacity: 0.7,
    fontSize: theme.spacing(0.7)
  },
  recipeCardRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  recipeCardAvatar: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5)
  },
  recipeCardRating: {
    fontSize: theme.spacing(0.9)
  },

  // speedial
  recipeDial: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  }
}));

export default useStyles;
