/*
  Main component for signup
*/
import React from 'react';
import useStyles from './Style';

import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import OrDivider from '../../Common/Divider/OrDivider';
import PasswordInput from '../../Common/Inputs/PasswordInput';
import EmailInput from '../../Common/Inputs/EmailInput';

const SignUp = props => {
  const classes = useStyles();

  return (
    <div className={classes.signUpRoot}>
      <div className={classes.signUpTitle}>
        <Typography variant='h4'>Sign Up</Typography>
      </div>
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
      <OrDivider />
      <div className={classes.signUpSocial}>
        <GoogleLogin
          buttonText='SIGN UP WITH GOOGLE'
          className={classes.signUpGoogle}
        />
        <FacebookLogin
          buttonStyle={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '2px',
            width: '17rem',
            height: '3rem',
            justifyContent: 'space-between',
            paddingRight: '1.5rem'
          }}
          textButton='Sign Up with Facebook'
          fields='name,email,picture'
          icon={<Facebook />}
        />
      </div>
      <Typography variant='caption' className={classes.signUpLinks}>
        <Link to='signin'>Already have an account? Sign In</Link>
      </Typography>
    </div>
  );
};

export default SignUp;
