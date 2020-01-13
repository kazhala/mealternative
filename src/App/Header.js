import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import {
  MenuRounded,
  HomeRounded,
  MapRounded,
  AccountCircle
} from '@material-ui/icons';

const Header = props => {
  const { classes, isAuthenticated, history, signOut } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleRouteChange = path => {
    history.push(path);
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = path => {
    handleClose();
    handleRouteChange(path);
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  return (
    <AppBar position='fixed'>
      <Toolbar disableGutters className={classes.menuBarLayout}>
        <div>
          <IconButton style={{ color: '#eceff4' }}>
            <MenuRounded />
          </IconButton>

          <IconButton
            style={{ color: '#eceff4' }}
            onClick={() => handleRouteChange('/')}
          >
            <HomeRounded />
          </IconButton>
        </div>

        <div>
          <IconButton
            onClick={() => handleRouteChange('/map')}
            style={{ color: '#eceff4' }}
          >
            <MapRounded />
          </IconButton>

          <IconButton onClick={handleClick} style={{ color: '#eceff4' }}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isAuthenticated
              ? authMenus.map((item, index) => (
                  <MenuItem
                    onClick={
                      item.path
                        ? () => handleMenuClick(item.path)
                        : handleSignOut
                    }
                    key={index}
                  >
                    {item.text}
                  </MenuItem>
                ))
              : noAuthMenus.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                  >
                    {item.text}
                  </MenuItem>
                ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const authMenus = [{ text: 'Sign Out' }];

const noAuthMenus = [
  { path: '/signin', text: 'Sign In' },
  { path: '/signup', text: 'Sign Up' }
];

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default withRouter(Header);
