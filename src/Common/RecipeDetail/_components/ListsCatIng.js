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
  const { classes } = props;

  return (
    <List className={classes.detailListsRoot} component='div'>
      <ListItem>
        <ListItemIcon>
          <Kitchen />
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
            </>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
              <Chip size='small' label='asdfasfds' />
            </>
          }
        />
      </ListItem>
    </List>
  );
};

ListsCatIng.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ListsCatIng;
