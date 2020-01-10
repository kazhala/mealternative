/*
  Social signup buttons
*/

// react
import React from 'react';
// import PropTypes from 'prop-types';

// components
import { Facebook } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

// misc
import useStyles from './Style';

const SocialSignUp = props => {
  const classes = useStyles();

  return (
    <div className={classes.authSocial}>
      <GoogleLogin
        buttonText='SIGN UP WITH GOOGLE'
        className={classes.authGoogle}
      />
      {/* only supports inline */}
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

export default SocialSignUp;
