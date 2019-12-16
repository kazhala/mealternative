import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
  const { isAuthenticated } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar disableGutters className={classes.menuBarLayout}>
          <IconButton>
            <Menu />
          </IconButton>
          {isAuthenticated ? null : (
            <div>
              <Button>Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <div className={classes.offset} />
      <div className={classes.layout}>
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

export default App;
