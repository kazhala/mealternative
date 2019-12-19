import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mapRoot: {
    padding: theme.spacing(1),
    height: '100%',
    width: '100%'
  },
  googleMap: {
    width: '100%',
    height: '70vh',
    display: 'flex',
    justifyContent: 'center'
  },
  locationSelection: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '35% 65%',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  locationBtnGroup: {
    //
  },
  defaultLocationBtn: {
    // width:
  },
  selectLocationBtn: {
    //
  }
}));

export default useStyles;
