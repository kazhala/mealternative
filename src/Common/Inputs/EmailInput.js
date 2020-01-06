import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { Mail } from '@material-ui/icons';

const EmailInput = props => {
  const { className } = props;

  return (
    <TextField
      variant='outlined'
      placeholder='Email'
      label='Email'
      className={className}
      type='email'
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
  className: PropTypes.string.isRequired
};

export default EmailInput;
