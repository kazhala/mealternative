import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  comboRatingRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rating: {
    fontSize: '1rem'
  }
}));

export default useStyles;
