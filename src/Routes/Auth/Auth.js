/*
  Main Auth component, act as nested routes provider
*/
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AccountActivate from './_components/AccountActivate';
import ForgotPassword from './_components/ForgotPassword';
import useStyles from './Style';

const Auth = props => {
  const { cleanUp, match, error, success, loading, activate } = props;

  const classes = useStyles();

  return (
    <Switch>
      <Route
        path={`${match.url}/activate/:token`}
        exact
        render={props => (
          <AccountActivate
            error={error}
            success={success}
            loading={loading}
            activate={activate}
            cleanUp={cleanUp}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`${match.url}/forgot-password`}
        render={props => (
          <ForgotPassword
            error={error}
            success={success}
            loading={loading}
            cleanUp={cleanUp}
            classes={classes}
            {...props}
          />
        )}
      />
      <Redirect to='/' />
    </Switch>
  );
};

export default Auth;
