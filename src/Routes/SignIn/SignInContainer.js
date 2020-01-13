/*
  Sign in container
*/

// react
import React, { useReducer, useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../../Redux/authentication';

// components
import { Redirect } from 'react-router-dom';
import SignIn from './SignIn';

// useReducer values
const initialState = {
  email: '',
  password: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const SignInContainer = props => {
  const { isAuthenticated, cleanUp, signin } = props;
  const [formState, formDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  // update form state
  const handleFormChange = e => {
    const fieldName = e.target.name.toUpperCase();
    const payload = e.target.value;
    formDispatch({ type: fieldName, payload });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    signin(formState);
  };

  return (
    <>
      {isAuthenticated && <Redirect to='/' />}
      <SignIn
        formState={formState}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        {...props}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    success: state.Auth.success,
    loading: state.Auth.loading,
    error: state.Auth.error
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      signin: AuthActions.signin,
      cleanUp: AuthActions.cleanUp
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(SignInContainer);
