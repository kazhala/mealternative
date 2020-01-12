/*
  Forgot password component, provide a single field to enter email
*/

// react
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// components
import FormRoot from '../../../Common/Form/FormRoot';
import EmailInput from '../../../Common/Inputs/EmailInput';
import FormWrapper from '../../../Common/Form/FormWrapper';
import { Typography, Button, CircularProgress } from '@material-ui/core';

const ForgotPassword = props => {
  const { classes, success, error, cleanUp, loading, forgotPassword } = props;

  const [emailState, setEmailState] = useState('');

  const handleEmailChange = e => {
    setEmailState(e.target.value);
  };

  // clean up on unmount
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const handleSubmit = e => {
    e.preventDefault();
    forgotPassword(emailState);
  };

  return (
    <FormRoot title='Forgot Password' success={success} error={error}>
      <FormWrapper onSubmit={handleSubmit}>
        <Typography className={classes.formSubtitle} variant='caption'>
          Please enter your email below, you will receive a reset link shortly
          in your inbox
        </Typography>
        <EmailInput
          className={classes.formInput}
          name='email'
          value={emailState}
          onChange={handleEmailChange}
        />
        <Button
          className={classes.formButton}
          variant='contained'
          color='primary'
          type='submit'
          disabled={loading}
        >
          {loading ? <CircularProgress size='1rem' disableShrink /> : 'Submit'}
        </Button>
      </FormWrapper>
    </FormRoot>
  );
};

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  success: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  cleanUp: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

export default ForgotPassword;
