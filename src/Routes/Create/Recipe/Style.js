import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // recipe route
  routeRoot: {
    padding: theme.spacing(1),
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  routeTitle: {
    textAlign: 'center'
  },
  titleInput: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  autoCompletes: {
    width: '100%',
    marginTop: theme.spacing(1)
  },

  // steps
  stepsRoot: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  stepButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(0.5)
  },
  stepDescriptions: {
    marginTop: theme.spacing(0.5)
  },
  stepImage: {
    display: 'flex',
    alignItems: 'center'
  },

  // image option
  thumbPreview: {
    height: 'auto',
    maxHeight: theme.spacing(15),
    width: '100%',
    marginTop: theme.spacing(1)
  },
  imageOption: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    height: theme.spacing(3)
  },
  imageInput: {
    marginLeft: theme.spacing(1),
    width: '100%'
  },
  fileInput: {
    display: 'none'
  }
}));

export default useStyles;
