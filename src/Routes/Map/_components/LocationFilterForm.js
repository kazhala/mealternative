import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import { TextField, Button, Typography, Slider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  DirectionsWalk,
  DirectionsCar,
  DirectionsBike
} from '@material-ui/icons';

const searchOptions = ['chinese', 'thai', 'italian', 'pizza', 'ice cream'];

const LocationFilterForm = props => {
  const { classes, handleRestaurantSearch } = props;

  const [queryValue, setQueryValue] = useState('');
  // ['walk', 'bike', 'car']
  const [distanceType, setDistanceType] = useState(0);

  const handleChange = e => {
    setQueryValue(e.target.value);
  };

  const handleSelect = e => {
    setQueryValue(e.target.textContent);
  };

  const checkActiveType = type => {
    return distanceType === type ? { color: '#5e81ac' } : {};
  };

  const handleDistanceTypeSelect = type => {
    setDistanceType(type);
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
        <Typography variant='subtitle2'>Distance</Typography>
        <div className={classes.distanceSlider}>
          <Slider />
        </div>
      </div>
      <div className={classes.sliderSearchOptions}>
        <div className={classes.sliderBtnGroup}>
          <div
            className={classes.distanceType}
            onClick={() => handleDistanceTypeSelect(0)}
            style={checkActiveType(0)}
          >
            <DirectionsWalk />
          </div>
          <div
            className={classes.distanceType}
            onClick={() => handleDistanceTypeSelect(1)}
            style={checkActiveType(1)}
          >
            <DirectionsBike />
          </div>
          <div
            className={classes.distanceType}
            onClick={() => handleDistanceTypeSelect(2)}
            style={checkActiveType(2)}
          >
            <DirectionsCar />
          </div>
        </div>
        <Button onClick={() => handleRestaurantSearch(queryValue)}>
          <Typography variant='subtitle2'>Search</Typography>
        </Button>
      </div>
    </div>
  );
};

LocationFilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired
};

export default LocationFilterForm;
