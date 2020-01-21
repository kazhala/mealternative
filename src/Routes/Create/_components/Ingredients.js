import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  Paper,
  Button,
  Chip
} from '@material-ui/core';
import { PlaylistAdd } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

const Ingredients = props => {
  const { classes, ingredients, setIngredients } = props;

  const handleAutoChange = (e, value) => {
    setIngredients(value);
  };

  return (
    <Autocomplete
      multiple
      className={classes.ingredientsRoot}
      options={[]}
      defaultValue={ingredients}
      onChange={handleAutoChange}
      freeSolo
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => (
          <Chip variant='outlined' label={option} {...getTagProps({ index })} />
        ));
      }}
      renderInput={params => (
        <TextField
          {...params}
          variant='outlined'
          placeholder='Enter required ingredients'
          label='Ingredients'
          fullWidth
        />
      )}
    />
  );
};

Ingredients.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Ingredients;
