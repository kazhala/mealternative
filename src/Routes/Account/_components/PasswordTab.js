/*
  PasswordTab for changing the password
*/

// react
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import PasswordInput from '../../../Common/Inputs/PasswordInput';
import { Typography, Button } from '@material-ui/core';
import { Check } from '@material-ui/icons';

const PasswordTab = props => {
  const {
    infoMessage,
    classes,
    tabIndex,
    activeTab,
    handleUpdatePassword
  } = props;

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    e.persist();
    setPassword(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    if (infoMessage === 'Successfully updated password') {
      setPassword({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }
  }, [infoMessage]);

  const { oldPassword, newPassword, confirmPassword } = password;

  return (
    activeTab === tabIndex && (
      <form
        onSubmit={e => handleUpdatePassword(e, password)}
        className={classes.tabRoot}
      >
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
        <Button
          type='submit'
          variant='contained'
          endIcon={<Check />}
          className={classes.passwordInput}
          color='primary'
        >
          Update
        </Button>
      </form>
    )
  );
};

PasswordTab.propTypes = {
  classes: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleUpdatePassword: PropTypes.func.isRequired,
  infoMessage: PropTypes.string
};

export default PasswordTab;
