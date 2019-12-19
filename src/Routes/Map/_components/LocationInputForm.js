/*
  Center location input component
  Provide auto complete on address input
*/

// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import {
  TextField,
  CircularProgress,
  Button,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const LocationInputForm = props => {
  const {
    centerMarker,
    setCenterMarker,
    autoCompleteService,
    geoCoderService,
    currentPositionLatLng,
    lat,
    lng,
    classes
  } = props;
  // value of the textfiled
  const [value, setValue] = useState('');
  // src for autoCompletion
  const [autoSrc, setAutoSrc] = useState([]);
  // keep track if autoComplete is open
  const [open, setOpen] = useState(false);

  // handle input change and renders the auto completion
  const handleChange = e => {
    setValue(e.target.value);
    // prepare query for google autoCompleteService
    const searchQuery = {
      input: e.target.value,
      location: currentPositionLatLng,
      radius: 30000 // in Meters. 30km
    };
    // if there is input, perform google autoCompleteService request
    searchQuery.input &&
      autoCompleteService.getQueryPredictions(searchQuery, response => {
        // The name of each GoogleMaps place suggestion is in the "description" field
        if (response) {
          const dataSource = response.map(resp => resp.description);
          // set the autoCompletion's options
          setAutoSrc(dataSource);
        }
      });
  };

  // handle action when user clicks on the suggestion
  const handleSelect = e => {
    // value is not provided in this event, could get details in e.target.textContent
    // Probably need to change to a better method later
    setValue(e.target.textContent);
  };

  // relocate the center of the map based on user input
  // 0 means default location, 1 is user input location
  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === 0) {
      setCenterMarker({ lat, lng });
    } else {
      // decode the address to latlng
      geoCoderService.geocode({ address: value }, response => {
        if (!response[0]) {
          // if empty, than change to user location stored in redux
          setCenterMarker({ lat, lng });
          return;
        }
        const { location } = response[0].geometry;
        setCenterMarker({ lat: location.lat(), lng: location.lng() });
      });
    }
  };

  // check if the loading state should be displayed
  const determineLoading = () => {
    return open && !autoSrc.length > 0;
  };

  // check if the button should have outline to indicate active
  const checkOutline = () => {
    return centerMarker.lat === lat && centerMarker.lng === lng;
  };

  return (
    <div className={classes.locationSelection}>
      <div className={classes.locationBtnGroup}>
        <Button
          onClick={e => handleSubmit(e, 0)}
          color='primary'
          className={classes.defaultLocationBtn}
          variant={checkOutline() ? 'contained' : 'text'}
        >
          <Typography variant='subtitle2'>Current</Typography>
        </Button>
        <Button
          onClick={e => handleSubmit(e, 1)}
          color='primary'
          className={classes.selectLocationBtn}
          variant={!checkOutline() ? 'contained' : 'text'}
        >
          <Typography variant='subtitle2'>Select</Typography>
        </Button>
      </div>
      <Autocomplete
        options={autoSrc}
        loading={determineLoading()}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        disableOpenOnFocus
        onChange={handleSelect}
        renderInput={params => (
          <TextField
            {...params}
            label='Location center'
            variant='outlined'
            fullWidth
            placeholder='Enter an alternate address'
            value={value}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {determineLoading() && <CircularProgress />}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
    </div>
  );
};

LocationInputForm.propTypes = {
  centerMarker: PropTypes.object.isRequired,
  setCenterMarker: PropTypes.func.isRequired,
  autoCompleteService: PropTypes.object.isRequired,
  geoCoderService: PropTypes.object.isRequired,
  currentPositionLatLng: PropTypes.object.isRequired,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object.isRequired
};

export default LocationInputForm;
