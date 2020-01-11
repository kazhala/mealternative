import React from 'react';
import PropTypes from 'prop-types';

const ForgotPassword = props => {
  const { classes } = props;

  return <div className={classes.forgotPasswordRoot}>ForgotPassword</div>;
};

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ForgotPassword;
