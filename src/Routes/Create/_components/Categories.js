/*
  Category auto completion component
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const Categories = props => {
  const { classes, categoryList, categories, setCategories } = props;

  // update parents state
  const handleAutoChange = (e, value) => {
    if (value.length > 30) return;
    setCategories(value);
  };

  return (
    <Autocomplete
      className={classes.autoCompletes}
      multiple
      options={categoryList}
      value={categories}
      onChange={handleAutoChange}
      size='small'
      renderInput={params => (
        <TextField
          {...params}
          variant='outlined'
          placeholder='Enter categories'
          label='Categories'
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
  categoryList: PropTypes.array.isRequired,
  categores: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired
};

export default Categories;
