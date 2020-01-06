import React from 'react';
import PropTypes from 'prop-types';
import { Facebook } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const SocialSignUp = props => {
  const { classes } = props;

  return (
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
  );
};

SocialSignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SocialSignUp;
