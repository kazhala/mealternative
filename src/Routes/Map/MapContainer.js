/*
  Container for Map component
  Contains required sharable states for Map components
*/

// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import Map from './Map';

const MapContainer = props => {
  // lat, lng info from redux
  const { lat, lng } = props;

  // google map services
  const [autoCompleteService, setAutoCompleteService] = useState(null);
  const [placesServices, setPlacesServices] = useState(null);
  const [directionService, setDirectionService] = useState(null);
  const [geoCoderService, setGeoCoderService] = useState(null);
  const [currentPositionLatLng, setCurrentPositionLatLng] = useState(null);

  // determine if map is loaded
  const [mapLoaded, setMapLoaded] = useState(false);
  // center lat lng position
  const [centerMarker, setCenterMarker] = useState({});

  // get the center marker after lat and lng is set in redux
  useEffect(() => {
    setCenterMarker({ lat, lng });
  }, [lat, lng]);

  // Initiate google map services after map is loaded
  const handleMapApiLoaded = (map, maps) => {
    setAutoCompleteService(new maps.places.AutocompleteService());
    setPlacesServices(new maps.places.PlacesService(map));
    setDirectionService(new maps.DirectionsService());
    setGeoCoderService(new maps.Geocoder());
    setCurrentPositionLatLng(new maps.LatLng(lat, lng));
    setMapLoaded(true);
  };

  return (
    <Map
      {...props}
      handleMapApiLoaded={handleMapApiLoaded}
      autoCompleteService={autoCompleteService}
      placesServices={placesServices}
      directionService={directionService}
      geoCoderService={geoCoderService}
      currentPositionLatLng={currentPositionLatLng}
      mapLoaded={mapLoaded}
      centerMarker={centerMarker}
      setCenterMarker={setCenterMarker}
    />
  );
};

// connect to redux
const mapStateToProps = state => {
  return {
    lat: state.Location.latitude,
    lng: state.Location.longitude
  };
};

MapContainer.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default connect(mapStateToProps, null)(MapContainer);
