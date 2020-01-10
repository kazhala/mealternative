import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Style';
import { Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import SignInForm from './_components/SignInForm';
import OrDivider from '../../Common/Divider/OrDivider';
import SocialAuth from '../../Common/SocialAuth/SocialAuth';

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
    <div className={classes.signInRoot}>
      <div className={classes.signInTitle}>
        <Typography variant='h4'>Sign In</Typography>
      </div>
      <div className={classes.signInAlert}>
        {success && (
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </div>
      <SignInForm
        classes={classes}
        formState={formState}
        handleFormChange={handleFormChange}
        loading={loading}
        handleFormSubmit={handleFormSubmit}
      />
      <OrDivider />
      <SocialAuth />
    </div>
  );
};

SignIn.propTypes = {
  formState: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired
};

export default SignIn;
