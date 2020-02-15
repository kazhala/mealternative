/*
  PasswordTab for changing the password
*/

// react
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import PasswordInput from '../../../Common/Inputs/PasswordInput';
import { Typography } from '@material-ui/core';

const PasswordTab = props => {
  const { classes, tabIndex, activeTab } = props;

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    setPassword(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const { oldPassword, newPassword, confirmPassword } = password;

  return (
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        <Typography variant='h6' className={classes.passwordTitle}>
          Update your password
        </Typography>
        <PasswordInput
          value={oldPassword}
          label='Old Password'
          className={classes.passwordInput}
          name='oldPassword'
          onChange={handleChange}
        />
        <PasswordInput
          value={newPassword}
          label='New Password'
          className={classes.passwordInput}
          name='newPassword'
          onChange={handleChange}
        />
        <PasswordInput
          value={confirmPassword}
          repeat
          className={classes.passwordInput}
          name='confirmPassword'
          onChange={handleChange}
        />
      </div>
    )
  );
};

PasswordTab.propTypes = {
  classes: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
  activeTab: PropTypes.number.isRequired
};

export default PasswordTab;
