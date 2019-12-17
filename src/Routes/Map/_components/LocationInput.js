import React, { useState } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const LocationInput = props => {
  const [value, setValue] = useState('');
  const [autoSrc, setAutoSrc] = useState([]);
  const [open, setOpen] = useState(false);

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
    setValue(e.target.textContent);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
  };

  const determineLoading = () => {
    return open && !autoSrc.length > 0;
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default LocationInput;
