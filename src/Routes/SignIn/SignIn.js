/*
  Main Sign in component
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import SignInForm from './_components/SignInForm';
import OrDivider from '../../Common/Divider/OrDivider';
import SocialAuth from '../../Common/SocialAuth/SocialAuth';
import FormRoot from '../../Common/Form/FormRoot';

// misc
import useStyles from './Style';

const SignIn = props => {
  const {
    handleFormSubmit,
    formState,
    handleFormChange,
    success,
    loading,
    error
  } = props;
  const classes = useStyles();

  return (
    <FormRoot success={success} error={error} title={'Sign In'}>
      <SignInForm
        classes={classes}
        formState={formState}
        handleFormChange={handleFormChange}
        loading={loading}
        handleFormSubmit={handleFormSubmit}
      />
      <OrDivider />
      <SocialAuth isLogin />
    </FormRoot>
  );
};

SignIn.propTypes = {
  formState: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired
};

export default SignIn;
