import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  detailRecipeRoot: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    //put on top of the speedDial
    zIndex: 1051
  }
}));

export default useStyles;
