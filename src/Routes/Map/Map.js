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
import LocationFilterForm from './_components/LocationFilterForm';

// Misc
import { GoogleMapAPIKey } from '../../config';
import useStyles from './Style';

const Map = props => {
  const {
    lat,
    lng,
    handleMapApiLoaded,
    mapLoaded,
    centerMarker,
    handleRestaurantSearch,
    handleAutoCompleteUpdate,
    updateCenterMarker,
    // nextPage,
    filteredResults,
    resLoading
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.mapRoot}>
      <React.Fragment>
        <LocationInputForm
          centerMarker={centerMarker}
          lat={lat}
          lng={lng}
          classes={classes}
          handleAutoCompleteUpdate={handleAutoCompleteUpdate}
          updateCenterMarker={updateCenterMarker}
        />
        <LocationFilterForm
          handleRestaurantSearch={handleRestaurantSearch}
          classes={classes}
        />
      </React.Fragment>
      {(!mapLoaded || resLoading) && <PageSpinner />}
      <div className={classes.googleMap}>
        {/* render google map after lat and lng for center position is set */}
        {centerMarker.lat && centerMarker.lng && (
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
  mapLoaded: PropTypes.bool.isRequired,
  centerMarker: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired,
  handleAutoCompleteUpdate: PropTypes.func.isRequired,
  updateCenterMarker: PropTypes.func.isRequired,
  nextPage: PropTypes.any,
  filteredResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  resLoading: PropTypes.bool.isRequired
};

export default Map;
