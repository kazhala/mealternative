import React from 'react';
import PropTypes from 'prop-types';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import {
  sideBarArrays,
  authArrays,
  noAuthArrays
} from '../Common/DefaultValues/SideBarArrays';

const SideBar = props => {
  const {
    classes,
    show,
    handleClose,
    isAuthenticated,
    handleSideBarSelect
  } = props;

  return (
    <Drawer open={show} onClose={handleClose}>
      <div className={classes.sideBarRoot}>
        <Typography
          component='div'
          className={classes.sideBarTitle}
          variant='h6'
        >
          Mealternative
        </Typography>

        <List dense component='nav'>
          {sideBarArrays.map((menuItem, index) => (
            <ListItem
              key={index}
              onClick={() => handleSideBarSelect(menuItem.path)}
              button
              className={classes.sideBarListItem}
            >
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variat='body2'>{menuItem.text}</Typography>
                }
              />
            </ListItem>
          ))}

          {!isAuthenticated &&
            noAuthArrays.map((menuItem, index) => (
              <ListItem
                button
                className={classes.sideBarListItem}
                onClick={() => handleSideBarSelect(menuItem.path)}
              >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant='body2'>{menuItem.text}</Typography>
                  }
                />
              </ListItem>
            ))}

          {isAuthenticated &&
            authArrays.map((menuItem, index) => (
              <ListItem
                button
                className={classes.sideBarListItem}
                onClick={() => handleSideBarSelect(menuItem.path)}
              >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant='body2'>{menuItem.text}</Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </div>
    </Drawer>
  );
};

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleSideBarSelect: PropTypes.func.isRequired
};

export default SideBar;
