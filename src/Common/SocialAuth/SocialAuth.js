/*
  Social signup buttons
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
import GoogleIcon from '../../Assets/google-icon.png';
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

// misc
import useStyles from './Style';

const SocialSignUp = props => {
  const { isLogin } = props;
  const classes = useStyles();

  return (
    <div className={classes.authSocial}>
      <div className={classes.authGoogle}>
        <img
          alt='Google Icon'
          src={GoogleIcon}
          className={classes.socialIcon}
        />
        {!isLogin ? (
          <Typography>SIGN UP WITH GOOGLE</Typography>
        ) : (
          <Typography>SIGN IN WITH GOOGLE</Typography>
        )}
      </div>
      <div className={classes.authFacebook}>
        <Facebook className={classes.socialIcon} />
        {!isLogin ? (
          <Typography>SIGN UP WITH FACEBOOK</Typography>
        ) : (
          <Typography>SIGN IN WITH FACEBOOK</Typography>
        )}
      </div>
      {/* <GoogleLogin */}
      {/*   buttonText='SIGN UP WITH GOOGLE' */}
      {/*   className={classes.authGoogle} */}
      {/* /> */}
      {/* {/1* only supports inline *1/} */}
      {/* <FacebookLogin */}
      {/*   buttonStyle={{ */}
      {/*     display: 'flex', */}
      {/*     alignItems: 'center', */}
      {/*     borderRadius: '2px', */}
      {/*     width: '17rem', */}
      {/*     height: '3rem', */}
      {/*     justifyContent: 'space-between', */}
      {/*     paddingRight: '1.5rem' */}
      {/*   }} */}
      {/*   textButton='Sign Up with Facebook' */}
      {/*   fields='name,email,picture' */}
      {/*   icon={<Facebook />} */}
      {/* /> */}
    </div>
  );
};

SocialSignUp.propTypes = {
  isLogin: PropTypes.bool
};

export default SocialSignUp;
