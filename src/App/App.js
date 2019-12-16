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
import HomeContainer from '../Routes/Home/HomeContainer';
import SignInContainer from '../Routes/SignIn/SignInContainer';
import SignUpContainer from '../Routes/SignUp/SignUpContainer';
import useStyles from './Style';

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar disableGutters className={classes.menuBarLayout}>
          <IconButton>
            <Menu />
          </IconButton>
          <div>
            <Button>Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      <div className={classes.layout}>
        <div>header</div>
        <div className={classes.contentRoot}>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/signin' component={SignInContainer} />
            <Route path='/signup' component={SignUpContainer} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
