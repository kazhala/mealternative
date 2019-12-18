/*
  Map component, display google map and markers
*/

// React
import React from 'react';
import PropTypes from 'prop-types';

// Compoennts
import GoogleMapReact from 'google-map-react';
import PageSpinner from '../../Common/Spinner/PageSpinner';
import LocationInputForm from './_components/LocationInputForm';

// Misc
import { GoogleMapAPIKey } from '../../config';
import useStyles from './Style';

const Map = props => {
  const {
    lat,
    lng,
    placesServices,
    setPlacesServices,
    autoCompleteService,
    setAutoCompleteService,
    directionService,
    setDirectionService,
    geoCoderService,
    setGeoCoderService,
    currentPositionLatLng,
    setCurrentPositionLatLng,
    mapLoaded,
    setMapLoaded,
    centerMarker,
    setCenterMarker
  } = props;
  const classes = useStyles();

  // Initiate google map services after map is loaded
  const handleApiLoaded = (map, maps) => {
    setAutoCompleteService(new maps.places.AutocompleteService());
    setPlacesServices(new maps.places.PlacesService(map));
    setDirectionService(new maps.DirectionsService());
    setGeoCoderService(new maps.Geocoder());
    setCurrentPositionLatLng(new maps.LatLng(lat, lng));
    setMapLoaded(true);
  };

  return (
    <div className={classes.mapRoot}>
      <div className={classes.googleMap}>
        {/* render google map after lat and lng for center position is set */}
        {centerMarker.lat && centerMarker.lng ? (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GoogleMapAPIKey,
              libraries: ['places', 'directions']
            }}
            center={{ lat: centerMarker.lat, lng: centerMarker.lng }}
            defaultZoom={14}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <TestDrop lat={centerMarker.lat} lng={centerMarker.lng} />
          </GoogleMapReact>
        ) : (
          <PageSpinner />
        )}
      </div>
      {mapLoaded && (
        <LocationInputForm
          autoCompleteService={autoCompleteService}
          currentPositionLatLng={currentPositionLatLng}
          geoCoderService={geoCoderService}
          setCenterMarker={setCenterMarker}
          lat={lat}
          lng={lng}
        />
      )}
    </div>
  );
};

// temp place holder component
const TestDrop = () => (
  <div style={{ background: 'black', width: '5px', height: '5px' }}></div>
);

Map.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  placesServices: PropTypes.any,
  setPlacesServices: PropTypes.func.isRequired,
  autoCompleteService: PropTypes.any,
  setAutoCompleteService: PropTypes.func.isRequired,
  directionService: PropTypes.any,
  setDirectionService: PropTypes.func.isRequired,
  geoCoderService: PropTypes.any,
  setGeoCoderService: PropTypes.func.isRequired,
  currentPositionLatLng: PropTypes.any,
  setCurrentPositionLatLng: PropTypes.func.isRequired,
  mapLoaded: PropTypes.bool.isRequired,
  setMapLoaded: PropTypes.func.isRequired,
  centerMarker: PropTypes.object.isRequired,
  setCenterMarker: PropTypes.func.isRequired
};

export default Map;
