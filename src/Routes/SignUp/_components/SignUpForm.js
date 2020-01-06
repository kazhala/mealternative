import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import PasswordInput from '../../../Common/Inputs/PasswordInput';
import EmailInput from '../../../Common/Inputs/EmailInput';

const SignUpForm = props => {
  const { classes } = props;

  return (
    <form className={classes.signUpForm}>
      <TextField
        variant='outlined'
        placeholder='User Name'
        label='username'
        className={classes.signUpInput}
      />
      <EmailInput className={classes.signUpInput} />
      <PasswordInput className={classes.signUpInput} />
      <div className={classes.signUpButton}>
        <Button variant='contained' color='primary'>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SignUpForm;
