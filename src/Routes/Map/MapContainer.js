import React, { useState } from 'react';
import { connect } from 'react-redux';
import Map from './Map';

const MapContainer = props => {
  const [autoCompleteService, setAutoCompleteService] = useState(null);
  const [placesServices, setPlacesServices] = useState(null);
  const [directionService, setDirectionService] = useState(null);
  const [geoCoderService, setGeoCoderService] = useState(null);

  return (
    <Map
      {...props}
      autoCompleteService={autoCompleteService}
      setAutoCompleteService={setAutoCompleteService}
      placesServices={placesServices}
      setPlacesServices={setPlacesServices}
      directionService={directionService}
      setDirectionService={setDirectionService}
      geoCoderService={geoCoderService}
      setGeoCoderService={setGeoCoderService}
    />
  );
};

const mapStateToProps = state => {
  return {
    lat: state.Location.latitude,
    lng: state.Location.longitude
  };
};

export default connect(mapStateToProps, null)(MapContainer);
