import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormRoot from '../../../Common/Form/FormRoot';
import EmailInput from '../../../Common/Inputs/EmailInput';
import FormWrapper from '../../../Common/Form/FormWrapper';
import { Typography, Button, CircularProgress } from '@material-ui/core';

const ForgotPassword = props => {
  const { classes, success, error, cleanUp, loading } = props;

  const [emailState, setEmailState] = useState('');

  const handleEmailChange = e => {
    setEmailState(e.target.value);
  };

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <FormRoot title='Forgot Password' success={success} error={error}>
      <FormWrapper onSubmit={() => console.log('hello')}>
        <Typography className={classes.forgotSubtitle} variant='caption'>
          Please enter your email below, you will receive a reset link shortly
          in your inbox
        </Typography>
        <EmailInput
          className={classes.forgotEmail}
          name='email'
          value={emailState}
          onChange={handleEmailChange}
        />
        <Button
          className={classes.forgotButton}
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
  classes: PropTypes.object.isRequired
};

export default ForgotPassword;
