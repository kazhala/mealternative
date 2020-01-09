import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../../Redux/authentication';
import SignIn from './SignIn';

const initialState = {
  email: '',
  password: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const SignInContainer = props => {
  const [formState, formDispatch] = useReducer(reducer, initialState);

  return (
    <SignIn formState={formState} formDispatch={formDispatch} {...props} />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      signin: AuthActions.signin
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(SignInContainer);
