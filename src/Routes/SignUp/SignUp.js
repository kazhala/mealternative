/*
  Main component for signup
*/

// react
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Style';

// components
import OrDivider from '../../Common/Divider/OrDivider';
import SignUpForm from './_components/SignUpForm';
import SocialAuth from '../../Common/SocialAuth/SocialAuth';
import FormRoot from '../../Common/Form/FormRoot';

const SignUp = props => {
  const classes = useStyles();
  const {
    formState,
    handleFormChange,
    handleFormSubmit,
    loading,
    success,
    error
  } = props;

  return (
    <FormRoot title='Sign Up' success={success} error={error}>
      <SignUpForm
        formState={formState}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        classes={classes}
        loading={loading}
      />
      {/* divider between form or social signup */}
      <OrDivider />
      <SocialAuth />
    </FormRoot>
  );
};

SignUp.propTypes = {
  formState: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};

export default SignUp;
