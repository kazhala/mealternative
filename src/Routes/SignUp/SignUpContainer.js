/*
  Sign up container
*/

// react
import React, { useReducer } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions } from '../../Redux/authentication';

// components
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';

const initialState = {
  username: '',
  email: '',
  password: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USERNAME':
      return { ...state, username: action.payload };
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const SignUpContainer = props => {
  const [formState, formDispatch] = useReducer(reducer, initialState);

  const handleFormChange = e => {
    const fieldName = e.target.name.toUpperCase();
    const payload = e.target.value;
    formDispatch({ type: fieldName, payload });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    props.signup(formState);
    // console.log('submited', formState);
  };

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
      signup: AuthActions.signup
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
