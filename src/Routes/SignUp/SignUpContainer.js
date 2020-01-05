/*
  Sign up container
*/

// react
import React from 'react';

// Redux
import { connect } from 'react-redux';

// components
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';

const SignUpContainer = props => {
  return (
    <>
      {props.isAuthenticated && <Redirect to='/' />}
      <SignUp {...props} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(SignUpContainer);
