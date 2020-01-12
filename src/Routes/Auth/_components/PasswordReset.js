/*
  Reset password component, single input field
*/

// react
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// components
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
    resetPassword,
    formError
  } = props;

  const [passwordState, setPasswordState] = useState('');
  const [repeatState, setRepeatState] = useState('');

  // clean up
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const handleSubmit = e => {
    e.preventDefault();
    if (passwordState !== repeatState) {
      formError("Password doesn't match, please double check");
    } else {
      // prepare payload, see backend
      const payload = {
        passwordResetToken: match.params.token,
        newPassword: passwordState
      };
      resetPassword(payload);
    }
  };

  const handlePasswordChange = e => {
    setPasswordState(e.target.value);
  };

  const handleRepeatChange = e => {
    setRepeatState(e.target.value);
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
          onChange={handlePasswordChange}
          name='password'
        />
        <PasswordInput
          className={classes.formInput}
          value={repeatState}
          onChange={handleRepeatChange}
          name='repeat'
          repeat
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
  success: PropTypes.string.isRequired,
  cleanUp: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  formError: PropTypes.func.isRequired
};

export default PasswordReset;
