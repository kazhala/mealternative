/*
  Container for the app
  Used to provide connection with redux for app.js
  And get user location when app mounts
*/

// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../Redux/authentication';

// Components
import App from './App';

const AppContainer = props => {
  return <App {...props} />;
};

// connection with redux
const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    userDetails: state.Auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signOut: AuthActions.signOut
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
