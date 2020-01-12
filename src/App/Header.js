import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const Header = props => {
  const { classes, isAuthenticated, history, signOut } = props;

  const handleRouteChange = name => {
    history.push(`/${name}`);
  };

  return (
    <AppBar position='fixed'>
      <Toolbar disableGutters className={classes.menuBarLayout}>
        <IconButton>
          <Menu style={{ color: '#eceff4' }} />
        </IconButton>
        {isAuthenticated ? (
          <div>
            <Button style={{ color: '#eceff4' }} onClick={signOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => handleRouteChange('map')}
              style={{ color: '#eceff4' }}
            >
              Map
            </Button>
            <Button
              onClick={() => handleRouteChange('signin')}
              style={{ color: '#eceff4' }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => handleRouteChange('signup')}
              style={{ color: '#eceff4' }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default withRouter(Header);
