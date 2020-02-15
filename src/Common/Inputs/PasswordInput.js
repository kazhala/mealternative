import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Repeat, Lock, Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordInput = props => {
  const { className, name, value, onChange, repeat, label } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant='outlined'
      placeholder={repeat ? 'Repeat password' : 'Password'}
      label={repeat ? 'Confirm' : label}
      className={className}
      type={showPassword ? 'text' : 'password'}
      name={name}
      value={value}
      onChange={onChange}
      required
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {repeat ? <Repeat /> : <Lock />}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

PasswordInput.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  repeat: PropTypes.bool,
  label: PropTypes.string
};

PasswordInput.defaultProps = {
  label: 'Password'
};

export default PasswordInput;
