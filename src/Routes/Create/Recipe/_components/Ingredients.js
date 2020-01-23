/*
  Ingredient auto complete components
*/

// react
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const Ingredients = props => {
  const { classes, ingredients, handleDetailChange } = props;

  // single selection of auto completion src
  const [autoValue, setAutoValue] = useState([]);

  // update parents array
  const handleAutoChange = (e, value) => {
    if (value.length > 30) return;
    handleDetailChange('ingredients', value);
  };

  // update autocompletion data
  const handleAutoUpdate = (e, value, reason) => {
    setAutoValue(prevValue => {
      const newValues = [...prevValue];
      newValues.pop();
      return [...newValues, value];
    });
  };

  return (
    <Autocomplete
      className={classes.autoCompletes}
      multiple
      options={autoValue}
      value={ingredients}
      onChange={handleAutoChange}
      onInputChange={handleAutoUpdate}
      freeSolo
      size='small'
      renderInput={params => (
        <TextField
          {...params}
          variant='outlined'
          placeholder='Enter ingredients'
          label='Ingredients'
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

Ingredients.propTypes = {
  classes: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
  handleDetailChange: PropTypes.func.isRequired
};

export default Ingredients;
