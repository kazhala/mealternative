import React from 'react';
import useStyles from './Style';

const SignUp = props => {
  const classes = useStyles();

  return (
    <div className={classes.signUpRoot}>
      <div>social icons</div>
      <div>Sign up form</div>
      <div>links to forgot password signin</div>
    </div>
  );
};

export default SignUp;
