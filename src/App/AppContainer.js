import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LocationActions } from '../Redux/location';
import App from './App';

const AppContainer = props => {
  const { getLocation, locationOptions } = props;

  useEffect(() => {
    const locationSuccess = pos => {
      const crd = pos.coords;
      getLocation({ lat: crd.latitude, lng: crd.longitude });
    };
    const locationError = err => console.log(err);

    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      locationOptions
    );
  }, [getLocation, locationOptions]);

  return <App {...props} />;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    locationOptions: state.Location.options
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getLocation: LocationActions.getLocation
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
