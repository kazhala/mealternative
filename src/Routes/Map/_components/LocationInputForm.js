/*
  Center location input component
  Provide auto complete on address input
*/

// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import { TextField, CircularProgress, IconButton } from '@material-ui/core';
import {
  AddLocationOutlined,
  LocationOn,
  Home,
  HomeOutlined
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

const LocationInputForm = props => {
  const {
    centerMarker,
    setCenterMarker,
    autoCompleteService,
    geoCoderService,
    lat,
    lng,
    classes,
    mapsApi
  } = props;
  // value of the textField
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
      location: new mapsApi.LatLng(lat, lng),
      radius: 100000 // in Meters. 100km
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

  // check if the loading state of the autoComplete should be displayed
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
        <IconButton onClick={e => handleSubmit(e, 0)} color='primary'>
          {checkOutline() ? <Home /> : <HomeOutlined />}
        </IconButton>
        <IconButton onClick={e => handleSubmit(e, 1)} color='primary'>
          {!checkOutline() ? <LocationOn /> : <AddLocationOutlined />}
        </IconButton>
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
            placeholder='Add address'
            value={value}
            onChange={handleChange}
            size='small'
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
  mapsApi: PropTypes.object.isRequired,
  centerMarker: PropTypes.object.isRequired,
  setCenterMarker: PropTypes.func.isRequired,
  autoCompleteService: PropTypes.object.isRequired,
  geoCoderService: PropTypes.object.isRequired,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object.isRequired
};

export default LocationInputForm;
