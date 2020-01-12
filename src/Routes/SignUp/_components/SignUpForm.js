/*
  Top sign up form
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import {
  TextField,
  Button,
  InputAdornment,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import PasswordInput from '../../../Common/Inputs/PasswordInput';
import EmailInput from '../../../Common/Inputs/EmailInput';
import FormWrapper from '../../../Common/Form/FormWrapper';

const SignUpForm = props => {
  const {
    classes,
    formState,
    handleFormChange,
    handleFormSubmit,
    loading
  } = props;
  const { username, email, password, repeat } = formState;

  return (
    <FormWrapper onSubmit={handleFormSubmit}>
      <TextField
        variant='outlined'
        placeholder='User name'
        label='User name'
        value={username}
        name='username'
        onChange={handleFormChange}
        className={classes.signUpInput}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <AccountCircle />
            </InputAdornment>
          )
        }}
      />
      <EmailInput
        name='email'
        value={email}
        onChange={handleFormChange}
        className={classes.signUpInput}
      />
      <PasswordInput
        name='password'
        value={password}
        onChange={handleFormChange}
        className={classes.signUpInput}
      />
      <PasswordInput
        name='repeat'
        value={repeat}
        onChange={handleFormChange}
        className={classes.signUpInput}
        repeat
      />
      <Button
        className={classes.signUpButton}
        variant='contained'
        color='primary'
        type='submit'
        disabled={loading}
      >
        {loading ? <CircularProgress size='1rem' disableShrink /> : 'Sign Up'}
      </Button>
      <Typography
        variant='caption'
        component='div'
        className={classes.signUpLinks}
      >
        <Link to='signin'>Already have an account? Sign In</Link>
      </Typography>
    </FormWrapper>
  );
};

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default SignUpForm;
