import React from 'react';
import Auth from './Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../../Redux/authentication';

const AuthContainer = props => {
  return <Auth {...props} />;
};

const mapStateToProps = state => {
  return {
    loading: state.Auth.loading,
    success: state.Auth.success,
    isAuthenticated: state.Auth.isAuthenticated,
    error: state.Auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      activate: AuthActions.activate
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
