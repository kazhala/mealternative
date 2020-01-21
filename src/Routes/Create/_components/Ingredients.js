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
  const { classes, ingredients } = props;

  return (
    <Autocomplete
      multiple
      className={classes.ingredientsRoot}
      options={[]}
      freeSolo
      renderTags={() => {
        return ingredients.map((ingredient, index) => (
          <Chip key={index} label='ingredient' />
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
