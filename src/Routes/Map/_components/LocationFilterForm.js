/*
  Filter option form for searching restaurant
*/

// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import {
  IconButton,
  TextField,
  Button,
  Typography,
  Slider
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Cached, UnfoldMore } from '@material-ui/icons';

// misc
import { searchOptions } from '../../../Common/AutoArray/RestaurantSearchOptions';

const LocationFilterForm = props => {
  const {
    classes,
    handleRestaurantSearch,
    nextPage,
    setResultRestaurantList,
    resultRestaurantList,
    setDetailOpen
  } = props;

  // value of auto completion
  const [queryValue, setQueryValue] = useState('');
  // auto completion src
  const [autoSrc, setAutoSrc] = useState(searchOptions);
  // radius filter for the search
  const [queryRadius, setQueryRadius] = useState(2);

  // handle auto completion change
  const handleChange = e => {
    const newValue = e.target.value;
    // update new auto src value
    setAutoSrc(prevState => {
      const oldValues = [...prevState];
      // remove the last value
      oldValues.pop();
      // append the new value
      return [...oldValues, newValue];
    });
  };

  // handle autocompletion select
  // textContent contains the new value
  const handleSelect = e => {
    setQueryValue(e.target.textContent);
  };

  // check if the btn should be disabled
  const checkDisable = type => {
    // type 0 is for load more button
    if (type === 0) {
      if (nextPage) {
        return !nextPage.hasNextPage;
      } else {
        return true;
      }
    } else {
      // type 1 is for detail button
      return !(resultRestaurantList.length > 0);
    }
  };

  // update distance length when slider changes
  const handleDistanceLengthChange = (e, newValue) => {
    setQueryRadius(newValue);
  };

  // display slider value to readable form in slider title
  const displayDistanceLength = () => {
    return `${queryRadius}km`;
  };

  return (
    <div>
      <Autocomplete
        options={autoSrc}
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
        {/* slider */}
        <div className={classes.sliderTitle}>
          <Typography variant='subtitle2'>Radius</Typography>
          <Typography className={classes.sliderTitleCaption} variant='caption'>
            {displayDistanceLength()}
          </Typography>
        </div>
        <div className={classes.distanceSlider}>
          <Slider
            step={0.5}
            marks
            max={10}
            min={0.5}
            valueLabelDisplay='auto'
            value={queryRadius}
            onChange={handleDistanceLengthChange}
          />
        </div>
        {/* loadmore, detail and search button */}
        <div className={classes.sliderSearchOptions}>
          <div>
            <IconButton
              disabled={checkDisable(0)}
              size='small'
              onClick={() => nextPage.nextPage()}
            >
              <Cached />
            </IconButton>
            <IconButton
              onClick={() => setDetailOpen(true)}
              disabled={checkDisable(1)}
              size='small'
            >
              <UnfoldMore />
            </IconButton>
          </div>
          <Button
            color='primary'
            variant='outlined'
            onClick={() => {
              setResultRestaurantList([]);
              handleRestaurantSearch(queryValue, queryRadius);
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
  handleRestaurantSearch: PropTypes.func.isRequired,
  nextPage: PropTypes.any,
  setResultRestaurantList: PropTypes.func.isRequired,
  resultRestaurantList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDetailOpen: PropTypes.func.isRequired
};

export default LocationFilterForm;
