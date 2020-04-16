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
import DetailModal from './_components/DetailModal';
import IndividualDetail from './_components/IndividualDetail';

// Misc
import { GoogleMapAPIKey } from '../../config';
import useStyles from './Style';

const Map = (props) => {
  const {
    lat,
    lng,
    handleMapApiLoaded,
    mapLoaded,
    centerMarker,
    checkSelectedMarker,
    setSelectedMarker,
    handleRestaurantSearch,
    handleAutoCompleteUpdate,
    updateCenterMarker,
    nextPage,
    resultRestaurantList,
    setResultRestaurantList,
    resLoading,
    setResLoading,
    detailOpen,
    setDetailOpen,
    getBasicResDetails,
    individualModal,
    getDetailedResDetail,
    clearDetailResDetail,
    selectedMarker,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.mapRoot}>
      {/* position relative to viewport */}
      <IndividualDetail
        classes={classes}
        individualModal={individualModal}
        clearDetailResDetail={clearDetailResDetail}
      />
      {/* position relative to viewport */}
      <PageSpinner loading={!mapLoaded || resLoading} />

      {/* the main details components */}
      <div className={classes.locationSettings}>
        <LocationInputForm
          setSelectedMarker={setSelectedMarker}
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
          setResLoading={setResLoading}
          setResultRestaurantList={setResultRestaurantList}
          resultRestaurantList={resultRestaurantList}
          setDetailOpen={setDetailOpen}
          mapLoaded={mapLoaded}
        />
        <div className={classes.detailModalWrapper}>
          <DetailModal
            detailOpen={detailOpen}
            setDetailOpen={setDetailOpen}
            resultRestaurantList={resultRestaurantList}
            classes={classes}
            getBasicResDetails={getBasicResDetails}
            getDetailedResDetail={getDetailedResDetail}
            setSelectedMarker={setSelectedMarker}
          />
        </div>
      </div>

      {/* google map */}
      <div className={classes.googleMap}>
        {/* render google map after lat and lng for center position is set */}
        {centerMarker.lat && centerMarker.lng && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GoogleMapAPIKey,
              libraries: ['places', 'directions'],
            }}
            center={
              selectedMarker.geometry
                ? {
                    lat: selectedMarker.geometry.location.lat(),
                    lng: selectedMarker.geometry.location.lng(),
                  }
                : { lat: centerMarker.lat, lng: centerMarker.lng }
            }
            defaultZoom={16}
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
                checkSelectedMarker={checkSelectedMarker}
                lat={restaurant.geometry.location.lat()}
                lng={restaurant.geometry.location.lng()}
                restaurant={restaurant}
                getBasicResDetails={getBasicResDetails}
                getDetailedResDetail={getDetailedResDetail}
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
  handleMapApiLoaded: PropTypes.func.isRequired,
  centerMarker: PropTypes.object.isRequired,
  checkSelectedMarker: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired,
  handleAutoCompleteUpdate: PropTypes.func.isRequired,
  updateCenterMarker: PropTypes.func.isRequired,
  nextPage: PropTypes.any,
  setResultRestaurantList: PropTypes.func.isRequired,
  resultRestaurantList: PropTypes.arrayOf(PropTypes.object).isRequired,
  resLoading: PropTypes.bool.isRequired,
  setResLoading: PropTypes.func.isRequired,
  detailOpen: PropTypes.bool.isRequired,
  setDetailOpen: PropTypes.func.isRequired,
  getBasicResDetails: PropTypes.func.isRequired,
  individualModal: PropTypes.object.isRequired,
  getDetailedResDetail: PropTypes.func.isRequired,
  clearDetailResDetail: PropTypes.func.isRequired,
};

export default Map;
