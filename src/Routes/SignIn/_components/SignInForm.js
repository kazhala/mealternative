/*
  Top sign up form
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PasswordInput from '../../../Common/Inputs/PasswordInput';
import EmailInput from '../../../Common/Inputs/EmailInput';

const SignInForm = props => {
  const {
    classes,
    formState,
    handleFormChange,
    handleFormSubmit,
    loading
  } = props;
  const { email, password } = formState;

  return (
    <form className={classes.signInForm} onSubmit={handleFormSubmit}>
      <EmailInput
        name='email'
        value={email}
        onChange={handleFormChange}
        className={classes.signInInput}
      />
      <PasswordInput
        name='password'
        value={password}
        onChange={handleFormChange}
        className={classes.signInInput}
      />
      <Button
        className={classes.signInButton}
        variant='contained'
        color='primary'
        type='submit'
        disabled={loading}
      >
        {loading ? <CircularProgress size='1rem' disableShrink /> : 'Sign In'}
      </Button>
      <Typography
        variant='caption'
        component='div'
        className={classes.signInLinks}
      >
        <Link to='/signup'>Don't have an account? Sign In</Link>
      </Typography>
    </form>
  );
};

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default SignInForm;
