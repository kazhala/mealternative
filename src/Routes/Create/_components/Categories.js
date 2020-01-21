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
  const { classes, categoryList, categories, handleDetailChange } = props;

  // update parents state
  const handleAutoChange = (e, value) => {
    if (value.length > 30) return;
    handleDetailChange('categories', value);
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
  categories: PropTypes.array.isRequired,
  handleDetailChange: PropTypes.func.isRequired
};

export default Categories;
