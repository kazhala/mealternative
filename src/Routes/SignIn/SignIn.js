import React from 'react';
import PropTypes from 'prop-types';

const SignIn = props => {
  const { formState, formDispatch } = props;

  return <div>SignIn</div>;
};

SignIn.propTypes = {
  formState: PropTypes.object.isRequired,
  formDispatch: PropTypes.func.isRequired
};

export default SignIn;
