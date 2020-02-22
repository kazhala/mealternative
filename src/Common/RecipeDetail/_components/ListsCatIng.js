/*
  display categories and ingredients of a recipe
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Category, Kitchen } from '@material-ui/icons';
import {
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const ListsCatIng = props => {
  const { handleCategoryClick, classes, categories, ingredients } = props;

  return (
    // two lists to display categories and ingredients
    <List className={classes.detailListsRoot} component='div'>
      <ListItem>
        <ListItemIcon>
          <Kitchen />
        </ListItemIcon>
        <ListItemText
          primary={ingredients.map((ing, index) => (
            <Chip key={index} size='small' label={ing} />
          ))}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        {/* TODO: categories click to go to category */}
        <ListItemText
          primary={categories.map((cat, index) => (
            <Chip
              onClick={() => handleCategoryClick(cat._id)}
              key={index}
              size='small'
              label={cat.name}
            />
          ))}
        />
      </ListItem>
    </List>
  );
};

ListsCatIng.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  handleCategoryClick: PropTypes.func.isRequired
};

export default ListsCatIng;
