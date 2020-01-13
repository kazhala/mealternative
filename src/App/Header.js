import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import {
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Tooltip
} from '@material-ui/core';
import {
  HomeRounded,
  ExploreRounded,
  AccountCircle,
  MenuBookRounded,
  RestaurantMenuRounded,
  Search,
  MenuRounded
} from '@material-ui/icons';
import SideBar from './SideBar';

const Header = props => {
  const { classes, isAuthenticated, history, signOut } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const [sideBar, setSideBar] = useState(false);

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

  // using material ui to get view port width
  // inline animation require responsive
  const theme = useTheme();
  const showMenuIcons = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <SideBar
        handleClose={() => setSideBar(false)}
        classes={classes}
        show={sideBar && !showMenuIcons}
      />
      <AppBar position='fixed'>
        <Toolbar disableGutters className={classes.menuBarLayout}>
          <div className={classes.menuBarLeft}>
            {!showMenuIcons && (
              <IconButton onClick={() => setSideBar(true)} color='inherit'>
                <MenuRounded />
              </IconButton>
            )}
            <IconButton
              style={{ color: '#eceff4' }}
              onClick={() => handleRouteChange('/')}
            >
              <HomeRounded />
            </IconButton>
          </div>
          <div className={classes.menuBarRight}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {showMenuIcons && (
              <>
                <Tooltip title='Check out meal combinations!'>
                  <IconButton
                    onClick={() => handleRouteChange('/meals')}
                    style={{ color: '#eceff4' }}
                  >
                    <RestaurantMenuRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Feel like cooking? Checkout recipes'>
                  <IconButton
                    onClick={() => handleRouteChange('/recipes')}
                    style={{ color: '#eceff4' }}
                  >
                    <MenuBookRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Explorer around on the map'>
                  <IconButton
                    onClick={() => handleRouteChange('/map')}
                    style={{ color: '#eceff4' }}
                  >
                    <ExploreRounded />
                  </IconButton>
                </Tooltip>

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
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
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
