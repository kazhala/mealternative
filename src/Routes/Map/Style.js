import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mapRoot: {
    padding: theme.spacing(1),
    height: '100%',
    width: '100%'
  },
  googleMap: {
    width: '100%',
    height: '55%',
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
  },

  // detail modal
  detailModalBackDrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    background: 'black',
    opacity: '0.5',
    transition: 'opacity 0.3s'
  },
  detailModalRoot: {
    position: 'fixed',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    background: theme.palette.background.default,
    borderRadius: '5px',
    border: '1px solid black',
    transition: 'transform 0.5s'
  }
}));

export default useStyles;
