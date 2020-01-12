/*
  Auth container for handling all temporary auth actions
*/

// react
import React from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../../Redux/authentication';

// components
import Auth from './Auth';
import { Redirect } from 'react-router-dom';

const AuthContainer = props => {
  const { isAuthenticated } = props;

  return (
    <>
      {isAuthenticated && <Redirect to='/' />}
      <Auth {...props} />;
    </>
  );
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
      activate: AuthActions.activate,
      cleanUp: AuthActions.cleanUp,
      forgotPassword: AuthActions.forgotPassword,
      resetPassword: AuthActions.resetPassword,
      formError: AuthActions.formError
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
