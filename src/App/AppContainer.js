/*
  Container for the app
  Used to provide connection with redux for app.js
  And get user location when app mounts
*/

// React
import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LocationActions } from '../Redux/location';
import { AuthActions } from '../Redux/authentication';

// Components
import App from './App';

const AppContainer = props => {
  const { getLocation, locationOptions } = props;

  // get user location information on any page mounts
  // store ir in redux
  useEffect(() => {
    // success call back when getting location
    const locationSuccess = pos => {
      const crd = pos.coords;
      // store the lat lng to redux
      getLocation({ lat: crd.latitude, lng: crd.longitude });
    };
    // error call back
    const locationError = err => console.log(err);

    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      locationOptions
    );
  }, [getLocation, locationOptions]);

  return <App {...props} />;
};

// connection with redux
const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    userDetails: state.Auth.user,
    locationOptions: state.Location.options
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getLocation: LocationActions.getLocation,
      signOut: AuthActions.signOut
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
