import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  comboRatingRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rating: {
    fontSize: '1rem'
  },
  comboRatingText: {
    fontSize: theme.spacing(0.7)
  }
}));

export default useStyles;
