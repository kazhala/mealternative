import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../Routes/Home/HomeContainer';
import SignInContainer from '../Routes/SignIn/SignInContainer';
import SignUpContainer from '../Routes/SignUp/SignUpContainer';
import useStyles from './Style';

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      hello
      <Switch>
        <Route exact path='/' component={HomeContainer} />
        <Route path='/signin' component={SignInContainer} />
        <Route path='/signup' component={SignUpContainer} />
      </Switch>
    </div>
  );
}

export default App;
