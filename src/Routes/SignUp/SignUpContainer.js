/*
  Sign up container
*/

// react
import React, { useReducer, useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../../Redux/authentication';

// components
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';

// initil form state
const initialState = {
  username: '',
  email: '',
  password: '',
  repeat: ''
};

// form state handler
const reducer = (state, action) => {
  switch (action.type) {
    case 'USERNAME':
      return { ...state, username: action.payload };
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    case 'REPEAT':
      return { ...state, repeat: action.payload };
    default:
      return state;
  }
};

const SignUpContainer = props => {
  const { cleanUp, signup, formError } = props;
  const [formState, formDispatch] = useReducer(reducer, initialState);

  // update form state
  const handleFormChange = e => {
    const fieldName = e.target.name.toUpperCase();
    const payload = e.target.value;
    formDispatch({ type: fieldName, payload });
  };

  // submit form
  const handleFormSubmit = e => {
    e.preventDefault();
    if (formState.repeat !== formState.password) {
      formError("Password doesn't match, please double check");
    } else {
      signup(formState);
    }
  };

  // clean up
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
      {props.isAuthenticated && <Redirect to='/' />}
      <SignUp
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
    loading: state.Auth.loading,
    success: state.Auth.success,
    error: state.Auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signup: AuthActions.signup,
      cleanUp: AuthActions.cleanUp,
      formError: AuthActions.formError
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
