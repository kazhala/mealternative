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
    mapsApi,
    handleMapApiLoaded,
    // placesServices,
    autoCompleteService,
    // directionService,
    geoCoderService,
    mapLoaded,
    centerMarker,
    setCenterMarker,
    handleRestaurantSearch
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.mapRoot}>
      {mapLoaded && (
        <LocationInputForm
          autoCompleteService={autoCompleteService}
          geoCoderService={geoCoderService}
          centerMarker={centerMarker}
          setCenterMarker={setCenterMarker}
          lat={lat}
          lng={lng}
          classes={classes}
          mapsApi={mapsApi}
        />
      )}
      <button onClick={handleRestaurantSearch}>hello</button>
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
            onGoogleApiLoaded={({ map, maps }) => handleMapApiLoaded(map, maps)}
          >
            <TestDrop lat={centerMarker.lat} lng={centerMarker.lng} />
          </GoogleMapReact>
        ) : (
          <PageSpinner />
        )}
      </div>
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
  mapsApi: PropTypes.any,
  placesServices: PropTypes.any,
  autoCompleteService: PropTypes.any,
  directionService: PropTypes.any,
  geoCoderService: PropTypes.any,
  mapLoaded: PropTypes.bool.isRequired,
  centerMarker: PropTypes.object.isRequired,
  setCenterMarker: PropTypes.func.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired
};

export default Map;
