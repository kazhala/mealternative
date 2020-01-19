import React from 'react';
import useStyles from './Style';
import DefaultRoute from './_components/DefaultRoute';
import { Switch, Route, Redirect } from 'react-router-dom';

const Create = props => {
  const classes = useStyles();
  return (
    <>
      <Switch>
        <Route
          exact
          path='/create'
          render={props => <DefaultRoute {...props} classes={classes} />}
        />
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default Create;
