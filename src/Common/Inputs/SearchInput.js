import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const SearchInput = props => {
  const { classes, placeholder, value, onChange } = props;

  return (
    <TextField
      size='small'
      className={classes}
      value={value}
      onChange={onChange}
      variant='outlined'
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search color='inherit' />
          </InputAdornment>
        )
      }}
    />
  );
};

SearchInput.propTypes = {
  classes: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchInput;
