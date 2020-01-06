/*
  Main component for signup
*/
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Style';

import Typography from '@material-ui/core/Typography';
import OrDivider from '../../Common/Divider/OrDivider';
import SignUpForm from './_components/SignUpForm';
import SocialSignUp from './_components/SocialSignUp';

const SignUp = props => {
  const classes = useStyles();
  const { formState, handleFormChange } = props;

  return (
    <div className={classes.signUpRoot}>
      <div className={classes.signUpTitle}>
        <Typography variant='h4'>Sign Up</Typography>
      </div>
      <SignUpForm
        formState={formState}
        handleFormChange={handleFormChange}
        classes={classes}
      />
      <OrDivider />
      <SocialSignUp classes={classes} />
    </div>
  );
};

SignUp.propTypes = {
  formState: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired
};

export default SignUp;
