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
  HomeRounded,
  ExploreRounded,
  AccountCircle,
  MenuBookRounded,
  RestaurantMenuRounded,
  ExitToAppRounded,
  VerifiedUserRounded,
  GroupAddRounded
} from '@material-ui/icons';

const SideBar = props => {
  const { classes, show, handleClose, isAuthenticated } = props;

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
          <ListItem button className={classes.sideBarListItem}>
            <ListItemIcon>
              <HomeRounded />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body2'>Home</Typography>}
            />
          </ListItem>
          <ListItem button className={classes.sideBarListItem}>
            <ListItemIcon>
              <ExploreRounded />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body2'>Map</Typography>}
            />
          </ListItem>
          <ListItem button className={classes.sideBarListItem}>
            <ListItemIcon>
              <MenuBookRounded />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body2'>Recipes</Typography>}
            />
          </ListItem>

          <ListItem button className={classes.sideBarListItem}>
            <ListItemIcon>
              <RestaurantMenuRounded />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body2'>Meals</Typography>}
            />
          </ListItem>
          <ListItem button className={classes.sideBarListItem}>
            <ListItemIcon>
              <VerifiedUserRounded />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body2'>Sign In</Typography>}
            />
          </ListItem>
          <ListItem button className={classes.sideBarListItem}>
            <ListItemIcon>
              <GroupAddRounded />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body2'>Sign Up</Typography>}
            />
          </ListItem>

          {isAuthenticated && (
            <>
              <ListItem button className={classes.sideBarListItem}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant='body2'>Account</Typography>}
                />
              </ListItem>
              <ListItem button className={classes.sideBarListItem}>
                <ListItemIcon>
                  <ExitToAppRounded />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant='body2'>Sign Out</Typography>}
                />
              </ListItem>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );
};

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default SideBar;
