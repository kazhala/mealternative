/*
  Main component for signup
*/
import React from 'react';
import useStyles from './Style';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import OrDivider from '../../Common/Divider/OrDivider';
import SignUpForm from './_components/SignUpForm';
import SocialSignUp from './_components/SocialSignUp';

const SignUp = props => {
  const classes = useStyles();

  return (
    <div className={classes.signUpRoot}>
      <div className={classes.signUpTitle}>
        <Typography variant='h4'>Sign Up</Typography>
      </div>
      <SignUpForm classes={classes} />
      <OrDivider />
      <SocialSignUp classes={classes} />
      <Typography variant='caption' className={classes.signUpLinks}>
        <Link to='signin'>Already have an account? Sign In</Link>
      </Typography>
    </div>
  );
};

export default SignUp;
