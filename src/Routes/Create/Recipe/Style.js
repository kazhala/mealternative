/*
  Recipe create style
*/
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // recipe route
  routeRoot: {
    padding: theme.spacing(1),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '90%'
    },
    [theme.breakpoints.up('md')]: {
      width: '70%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%'
    }
  },
  updateGoBack: {
    position: 'absolute',
    top: theme.spacing(0.5),
    left: theme.spacing(0.5)
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
  stepPreview: {
    width: '100%',
    height: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15)
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(20)
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(25)
    }
  },

  // upload button
  recipeSubmit: {
    marginTop: theme.spacing(1)
  },

  // image option
  thumbPreview: {
    height: 'auto',
    maxHeight: theme.spacing(15),
    width: '100%',
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      maxHeight: theme.spacing(20)
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: theme.spacing(25)
    },
    [theme.breakpoints.up('xl')]: {
      maxHeight: theme.spacing(30)
    }
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
