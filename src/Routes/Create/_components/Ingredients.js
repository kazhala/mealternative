import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const Ingredients = props => {
  const { classes, ingredients, setIngredients } = props;

  const [autoValue, setAutoValue] = useState([]);

  const handleAutoChange = (e, value) => {
    if (value.length > 25) return;
    setIngredients(value);
  };

  const handleAutoUpdate = (e, value, reason) => {
    setAutoValue(prevValue => {
      const newValues = [...prevValue];
      newValues.pop();
      return [...newValues, value];
    });
  };

  return (
    <Autocomplete
      className={classes.ingredientsRoot}
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
  classes: PropTypes.object.isRequired
};

export default Ingredients;
