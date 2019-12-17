import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const LocationInput = props => {
  const [value, setValue] = useState('');

  const [autoSrc, setAutoSrc] = useState([]);

  const handleChange = e => {
    setValue(e.target.value);
    const searchQuery = {
      input: value,
      location: props.currentPositionLatLng, // Search within Singapore
      radius: 30000 // in Meters. 30km
    };
    searchQuery.input &&
      props.autoCompleteService.getQueryPredictions(searchQuery, response => {
        // The name of each GoogleMaps place suggestion is in the "description" field
        if (response) {
          const dataSource = response.map(resp => resp.description);
          setAutoSrc(dataSource);
        }
      });
  };

  const handleSelect = e => {
    console.log(e.target.textContent);
    setValue(e.target.textContent);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        options={autoSrc}
        disableOpenOnFocus
        onChange={handleSelect}
        renderInput={params => (
          <TextField
            {...params}
            label='Location center'
            variant='outlined'
            fullWidth
            value={value}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
    </form>
  );
};

export default LocationInput;
