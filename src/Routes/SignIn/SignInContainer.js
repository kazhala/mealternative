import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../../Redux/authentication';
import SignIn from './SignIn';
import { Redirect } from 'react-router-dom';

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
  const { isAuthenticated, cleanUp } = props;
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

  return (
    <>
      {isAuthenticated && <Redirect to='/' />}
      <SignIn
        formState={formState}
        handleFormChange={handleFormChange}
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
