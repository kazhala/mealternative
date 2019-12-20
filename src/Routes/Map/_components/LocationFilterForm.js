import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import { TextField, Button, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const searchOptions = ['chinese', 'thai', 'italian', 'pizza', 'ice cream'];

const LocationFilterForm = props => {
  const { classes, handleRestaurantSearch } = props;

  const [queryValue, setQueryValue] = useState('');

  const handleChange = e => {
    setQueryValue(e.target.value);
  };

  const handleSelect = e => {
    setQueryValue(e.target.textContent);
  };

  return (
    <div>
      <Autocomplete
        options={searchOptions}
        disableOpenOnFocus
        onChange={handleSelect}
        renderInput={params => (
          <TextField
            {...params}
            label='Resturant Type'
            variant='outlined'
            fullWidth
            placeholder='Search restaurant based on types'
            value={queryValue}
            size='small'
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Button onClick={() => handleRestaurantSearch(queryValue)}>Search</Button>
    </div>
  );
};

LocationFilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired
};

export default LocationFilterForm;
