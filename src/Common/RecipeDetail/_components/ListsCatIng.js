/*
  display categories and ingredients of a recipe
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Category, Kitchen } from '@material-ui/icons';
import {
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const ListsCatIng = props => {
  const { classes, categories, ingredients } = props;

  return (
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
        <ListItemText
          primary={categories.map((cat, index) => (
            <Chip key={index} size='small' label={cat.name} />
          ))}
        />
      </ListItem>
    </List>
  );
};

ListsCatIng.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired
};

export default ListsCatIng;
