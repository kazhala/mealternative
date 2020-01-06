import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { Mail } from '@material-ui/icons';

const EmailInput = props => {
  const { className, name, value, onChange } = props;

  return (
    <TextField
      variant='outlined'
      placeholder='Email'
      required
      label='Email'
      className={className}
      type='email'
      name={name}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Mail />
          </InputAdornment>
        )
      }}
    />
  );
};

EmailInput.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EmailInput;
