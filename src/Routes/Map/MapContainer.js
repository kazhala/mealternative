import React from 'react';
import { connect } from 'react-redux';
import Map from './Map';

const MapContainer = props => {
  return <Map {...props} />;
};

const mapStateToProps = state => {
  return {
    lat: state.Location.latitude,
    lng: state.Location.longitude
  };
};

export default connect(mapStateToProps, null)(MapContainer);
