/*
  Filter option form for searching restaurant
*/

// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import { IconButton, TextField, Button, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Cached, UnfoldMore } from '@material-ui/icons';

// search auto complete, will refactor to separate file
const searchOptions = ['chinese', 'thai', 'italian', 'pizza', 'ice cream'];

const LocationFilterForm = props => {
  const { classes, handleRestaurantSearch } = props;

  // value of auto completion
  const [queryValue, setQueryValue] = useState('');

  const [loadMoreDisabled, setLoadMoreDisabled] = useState(true);

  // handle auto completion change
  const handleChange = e => {
    setQueryValue(e.target.value);
  };

  // handle autocompletion select
  // textContent contains the new value
  const handleSelect = e => {
    setQueryValue(e.target.textContent);
  };

  return (
    <div>
      <Autocomplete
        options={searchOptions}
        disableOpenOnFocus
        onChange={handleSelect}
        className={classes.locationFilterAutoComplete}
        renderInput={params => (
          <TextField
            {...params}
            label='Restaurant Type'
            variant='outlined'
            fullWidth
            placeholder='Search restaurant type'
            value={queryValue}
            size='small'
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <div>
        <div className={classes.sliderSearchOptions}>
          <div>
            <IconButton disabled={loadMoreDisabled} size='small'>
              <Cached />
            </IconButton>
            <IconButton size='small'>
              <UnfoldMore />
            </IconButton>
          </div>
          <Button
            color='primary'
            variant='outlined'
            onClick={() => {
              handleRestaurantSearch(queryValue);
            }}
          >
            <Typography variant='subtitle2'>Search</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

LocationFilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired
};

export default LocationFilterForm;
