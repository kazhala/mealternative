/*
  Side bar of the app for small device
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// misc
import {
  sideBarArrays,
  authArrays,
  noAuthArrays
} from '../Common/DefaultValues/iconButtonArrays';

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
        {/* title */}
        <Typography
          component='div'
          className={classes.sideBarTitle}
          variant='h6'
        >
          Mealternative
        </Typography>

        {/* display the entire list */}
        <List dense component='nav'>
          {sideBarArrays.map((menuItem, index) => (
            <ListItem
              key={index}
              onClick={() => handleSideBarSelect(menuItem.path)}
              button
              className={classes.sideBarListItem}
              style={{
                pointerEvents: menuItem.disable ? 'none' : 'auto',
                opacity: menuItem.disable ? '0.5' : '1'
              }}
            >
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variat='body2'>{menuItem.text}</Typography>
                }
              />
            </ListItem>
          ))}

          {/* no authenticated only items */}
          {!isAuthenticated &&
            noAuthArrays.map((menuItem, index) => (
              <ListItem
                key={index}
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

          {/* authenticated only items */}
          {isAuthenticated &&
            authArrays.map((menuItem, index) => (
              <ListItem
                key={index}
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
