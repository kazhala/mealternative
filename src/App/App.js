/*
  The app component of the app, wraps everything in router
  Provide layout
*/

// React
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// Style
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import useStyles from './Style';

//Routes
import * as Routes from '../Routes/Routes';

const App = props => {
  // used to determine what to display in app bar
  const { isAuthenticated } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* get global css settings (enhancement) */}
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar disableGutters className={classes.menuBarLayout}>
          <IconButton>
            <Menu style={{ color: '#cfd8dc' }} />
          </IconButton>
          {isAuthenticated ? null : (
            <div>
              <Button style={{ color: '#cfd8dc' }}>Sign In</Button>
              <Button style={{ color: '#cfd8dc' }}>Sign Up</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* provide layout for the main contents */}
      <div className={classes.layout}>
        {/* offset the height of app bar */}
        <div className={classes.offset} />
        <div className={classes.contentRoot}>
          <Switch>
            <Route exact path='/' component={Routes.Home} />
            <Route path='/signin' component={Routes.SignIn} />
            <Route path='/signup' component={Routes.SignUp} />
            <Route path='/search' component={Routes.Results} />
            <Route path='/recipes' component={Routes.Recipes} />
            <Route path='/meals' component={Routes.Meals} />
            <Route path='/map' component={Routes.Map} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default App;
