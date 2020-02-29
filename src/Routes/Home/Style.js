import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  homeRoot: {
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    padding: theme.spacing(1)
  },

  // top part of the homepage
  homeTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  topCard: {
    width: '100%',
    height: theme.spacing(7),
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',
    position: 'relative',
    '&:hover': {
      boxShadow: theme.shadows[8],
      backgroundSize: '110%',
      cursor: 'pointer'
    }
  },
  topCardTitle: {
    position: 'absolute',
    left: theme.spacing(1),
    bottom: theme.spacing(1),
    color: theme.palette.common.white
  },
  topCardDescription: {
    position: 'absolute',
    right: theme.spacing(0),
    bottom: theme.spacing(0),
    color: theme.palette.common.white
  }
}));

export default useStyles;
