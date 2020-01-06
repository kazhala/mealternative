import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordInput = props => {
  const { className, name, value, onChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant='outlined'
      placeholder='Password'
      label='Password'
      className={className}
      type={showPassword ? 'text' : 'password'}
      name={name}
      value={value}
      onChange={onChange}
      required
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Lock />
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
  onChange: PropTypes.func.isRequired
};

export default PasswordInput;
