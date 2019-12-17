import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const LocationInput = props => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submited', value);
    const searchQuery = {
      input: value,
      location: props.currentPositionLatLng, // Search within Singapore
      radius: 30000 // in Meters. 30km
    };
    props.autoCompleteService.getQueryPredictions(searchQuery, response => {
      // The name of each GoogleMaps place suggestion is in the "description" field
      if (response) {
        const dataSource = response.map(resp => resp.description);
        console.log(dataSource);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField variant='outlined' value={value} onChange={handleChange} />;
    </form>
  );
};

export default LocationInput;
