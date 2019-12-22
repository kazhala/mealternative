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

  // location auto complete
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

  // location filter section
  distanceSlider: {
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(0.25)
  },
  sliderTitle: {
    display: 'flex'
  },
  sliderTitleCaption: {
    paddingLeft: theme.spacing(0.5)
  },
  sliderSearchOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    alignItems: 'center'
  },

  // map markers
  centerMarker: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
  },
  markerDetail: {
    position: 'absolute',
    transform: 'translate(-50%, 20%)',
    background: theme.palette.background.default,
    border: '1px solid #ccc',
    boxShadow: '0 0 1px 1px #ccc',
    borderRadius: '3px',
    width: 'max-content',
    fontSize: '0.5rem'
  }
}));

export default useStyles;
