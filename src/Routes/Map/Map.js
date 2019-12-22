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
import CenterMarker from './_components/CenterMarker';
import RestaurantMarker from './_components/RestaurantMarker';

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
    nextPage,
    resultRestaurantList,
    setResultRestaurantList,
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
          nextPage={nextPage}
          setResultRestaurantList={setResultRestaurantList}
          resultRestaurantList={resultRestaurantList}
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
            <CenterMarker
              classes={classes}
              lat={centerMarker.lat}
              lng={centerMarker.lng}
            />
            {resultRestaurantList.map((restaurant, index) => (
              <RestaurantMarker
                key={index}
                classes={classes}
                lat={restaurant.geometry.location.lat()}
                lng={restaurant.geometry.location.lng()}
              />
            ))}
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
};

Map.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  mapLoaded: PropTypes.bool.isRequired,
  centerMarker: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired,
  handleAutoCompleteUpdate: PropTypes.func.isRequired,
  updateCenterMarker: PropTypes.func.isRequired,
  nextPage: PropTypes.any,
  setResultRestaurantList: PropTypes.func.isRequired,
  resultRestaurantList: PropTypes.arrayOf(PropTypes.object).isRequired,
  resLoading: PropTypes.bool.isRequired
};

export default Map;
