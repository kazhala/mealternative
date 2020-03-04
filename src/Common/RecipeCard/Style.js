import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
    boxOrient: 'vertical',
    [theme.breakpoints.up('md')]: {
      lineClamp: 1
    }
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
  }
}));

export default useStyles;
