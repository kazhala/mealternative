import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormRoot from '../../../Common/Form/FormRoot';
import FormWrapper from '../../../Common/Form/FormWrapper';
import PasswordInput from '../../../Common/Inputs/PasswordInput';
import { Button, CircularProgress, Typography } from '@material-ui/core';

const PasswordReset = props => {
  const {
    loading,
    success,
    error,
    cleanUp,
    classes,
    match,
    resetPassword
  } = props;

  const [passwordState, setPasswordState] = useState('');

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      passwordResetToken: match.params.token,
      newPassword: passwordState
    };
    resetPassword(payload);
  };

  const handleChange = e => {
    setPasswordState(e.target.value);
  };

  return (
    <FormRoot title='Reset Password' success={success} error={error}>
      <FormWrapper onSubmit={handleSubmit}>
        <Typography className={classes.formSubtitle} variant='caption'>
          Enter your new password below
        </Typography>
        <PasswordInput
          className={classes.formInput}
          value={passwordState}
          onChange={handleChange}
          name='password'
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

PasswordReset.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired
};

export default PasswordReset;
