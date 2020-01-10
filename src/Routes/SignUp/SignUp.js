/*
  Main component for signup
*/
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Style';

import Typography from '@material-ui/core/Typography';
import OrDivider from '../../Common/Divider/OrDivider';
import SignUpForm from './_components/SignUpForm';
import SocialSignUp from './_components/SocialSignUp';
import { Alert, AlertTitle } from '@material-ui/lab';
import SocialAuth from '../../Common/SocialAuth/SocialAuth';

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
    <div className={classes.signUpRoot}>
      <div className={classes.signUpTitle}>
        <Typography variant='h4'>Sign Up</Typography>
      </div>
      {/* alert */}
      <div className={classes.signUpAlert}>
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
    </div>
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
