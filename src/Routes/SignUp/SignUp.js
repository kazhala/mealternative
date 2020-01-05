/*
  Main component for signup
*/
import React from 'react';
import useStyles from './Style';

import { Button, TextField } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const SignUp = props => {
  const classes = useStyles();

  return (
    <div className={classes.signUpRoot}>
      <form className={classes.signUpForm}>
        <TextField
          variant='outlined'
          placeholder='User Name'
          label='username'
        />
        <TextField variant='outlined' placeholder='Email' label='email' />
        <TextField variant='outlined' placeholder='Password' label='password' />
        <div>
          <Button variant='contained' color='primary'>
            Sign Up
          </Button>
        </div>
      </form>
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
      <div>links to forgot password signin</div>
    </div>
  );
};

export default SignUp;
