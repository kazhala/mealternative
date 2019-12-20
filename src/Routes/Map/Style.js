import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mapRoot: {
    padding: theme.spacing(1),
    height: '100%',
    width: '100%'
  },
  googleMap: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center'
  },
  locationSelection: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '30% 70%',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  locationBtnGroup: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: theme.spacing(0.5)
  },
  locationFilterAutoComplete: {
    marginBottom: theme.spacing(0.5)
  },
  distanceSlider: {
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(0.25)
  },
  sliderSearchOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1)
  },
  sliderBtnGroup: {
    display: 'flex'
  },
  distanceType: {
    paddingRight: theme.spacing(0.5),
    verticalAlign: 'center',
    color: '#ccc',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default useStyles;
